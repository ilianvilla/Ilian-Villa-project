require('dotenv').config();
import path from 'path';
import express from 'express';
// import ejs from 'ejs';
import bodyParser from 'body-parser';
const app = express();
import bcrypt from 'bcrypt';
import connection from './connection';
import jwt from 'jsonwebtoken';
// import session from 'express-session';
import { Request, Response } from 'express';


// app.use(session({
//   secret: 'process.env.SESSION_SECRET',
//   resave: false,
//   saveUninitialized: true
// }));



app.set('views',path.join(__dirname,'views'));
			

//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/users", (req: Request, res: Response) => {
  res.render("user_index");
});

app.get("/user/:id/edit", (req: Request, res: Response) => {
  res.render("user_edit");
});

app.get("/user/update", (req: Request, res: Response) => {
  res.render("user_edit");
});

app.get("/user/:id/delete", (req: Request, res: Response) => {
  res.render("user_edit");
});

app.get("/rooms", (req: Request, res: Response) => {
  res.render("room_index");
});

app.get("/room/:id/edit", (req: Request, res: Response) => {
  res.render("room_edit");
});

app.get("/room/update", (req: Request, res: Response) => {
   res.render("room_edit");
});

app.get("/room/:id/delete", (req: Request, res: Response) => {
  res.render("room_edit");
});

app.get("/booking/:id/delete", (req: Request, res: Response) => {
  res.render("booking_index");
});


app.get('/', (req: Request, res: Response) => {
    res.render('home');
});

app.get("/createroom", (req: Request, res: Response) => {
    res.render("room_add");
});

app.post('/createroom', (req: Request, res: Response) => {
    let data = {number: req.body.number, price: req.body.price, description: req.body.description, image: req.body.image, roomtype_id: req.body.roomtype_id};
let sql = "INSERT INTO room (id, number, price, description, image, roomtype_id) VALUES (null, '" + req.body.number + "', '" + req.body.price + "', '" + req.body.description + "', '" + req.body.image + "', '" + req.body.roomtype_id + "')";
let query = connection.query(sql, data,(err: any, results: any) => {
  if(err) throw err;
  res.redirect('/rooms');
})});


app.get("/createbooking", (req: Request, res: Response) => {

  res.render("booking_add");
});



  app.post('/createbooking', (req: Request, res: Response) => {
    
    connection.query(`INSERT INTO booking (startDate, endDate, user_id, room_id) 
                    VALUES ('${req.body.startDate}','${req.body.endDate}','169', '${req.body.room_id}')`);
    res.status(200).send("Booking created successfully, these are the dates: " + req.body.startDate + ',' + req.body.endDate);

    });

    app.get("/showRooms", (req: Request, res: Response) => {
      res.render("showRooms");
    });

app.post('/showRooms', (req: Request, res: Response) => {
  const dates = {startDate: req.body.startDate, endDate: req.body.endDate, room_id: req.body.room_id};
  
  let sql = `SELECT r.*, roomtype.* , CASE WHEN (b.room_id IS NOT NULL) THEN 'Not Available' ELSE 'Available' END AS availability FROM room r INNER JOIN roomtype ON roomtype.type_id = r.roomtype_id LEFT JOIN booking b ON r.id = b.room_id WHERE (b.startDate NOT BETWEEN '${req.body.startDate}' AND '${req.body.endDate}') OR (b.endDate NOT BETWEEN '${req.body.startDate}' AND '${req.body.endDate}') OR (b.room_id IS NULL) GROUP BY r.id`;
;
    let query = connection.query(sql, (err: any, rows: { availability: any; }) => {
        console.log(rows);
        if(err) throw err;
        res.render('showRooms', {
            title : 'Room List',
            room : rows,
            availability : rows.availability,
            dates
            
        });
    
    })});
 
    //full
    app.get('/signup', (req: Request, res: Response) => {
      res.render('user_add');
    });
    
    // Set up route to handle user signup
    app.post('/signup', (req: Request, res: Response) => {
      // Get signup form data from request body
      const { firstName, lastName, phoneNumber, email, password, isAdmin } = req.body;
    
      // Hash the password using bcrypt
      bcrypt.hash(password, 10, (error, hashedPassword) => {
        if (error) throw error;
    
        // Insert new user into MySQL database
        connection.query(
          "INSERT INTO user (id, firstName, lastName, email, phoneNumber, password, isAdmin) VALUES (null, '" + firstName + "',  '" + lastName + "', '" + email + "', '" + phoneNumber + "', '" + hashedPassword + "', '" + isAdmin + "')",
          [firstName, lastName, phoneNumber, email, hashedPassword, isAdmin],
          (error: any) => {
            if (error) throw error;
            console.log('User created successfully');
            // create JWT with user's email, role and secret key
            const token = jwt.sign({ 
              email: email, 
              role: isAdmin === 1 ? 'admin' : 'user' 
            }, process.env.JWT_SECRET as string);
    
            // add the JWT to the response header
            res.set('Authorization', `Bearer ${token}`);
            res.redirect('/login');
          }
        );
      });
    });
    
    app.get('/login', (req: Request, res: Response) => {
      res.render('login');
    });

    app.post('/login', (req: Request, res: Response) => {
      const email = req.body.email;
      const password = req.body.password;
      connection.query(
        'SELECT * FROM user WHERE email = ?',
        [email],
        (error: any, results: string | any[]) => {
          if (error) throw error;
          if (results.length === 0) {
            res.redirect('/login?error=User not found');
            return;
          }
          const user = results[0];
          bcrypt.compare(password, user.password, (error, match) => {
            if (error) throw error;
            if (match) {
                // create JWT with user's email, role and secret key
                const token = jwt.sign({ 
                    email: email, 
                    role: user.isAdmin ? 'admin' : 'user' ,
                    userId: user.id
                }, process.env.JWT_SECRET as string);
                if(user.isAdmin) {
                    res.render('admin_dashboard');
                } else {
                    //decode the token to get the user's id
                    // const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
                    // fetch the user's bookings using the user's id from the token
                    connection.query(
                        `SELECT * FROM booking WHERE user_id = '169'`,
                        (error: any, rows: any) => {
                          if (error) throw error;
                          // render the bookings to the template
                          res.render('user_dashboard', {
                            booking: rows
                          });
                        }
                    );
                }
            } else {
                res.redirect('/login?error=Incorrect password');
            }
          });
        }
      );
    });
  
    app.get('/logout', (req: Request, res: Response) => {
      req.session.destroy((err) => {
          if(err) {
              return console.log(err);
          }
          res.redirect('/');
          
      });
  });
  
// Server Listening
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});
  
