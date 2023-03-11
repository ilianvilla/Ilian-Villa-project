require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
const app = express();
import connection from './connection';
import { Request, Response } from 'express';
import cors from 'cors'
import actions from './controllers/user';

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/users', actions.show);
app.get('/user/:id/edit', actions.edit);
app.put('/user/:id/update', actions.update);
app.get('/user/delete', actions.delete);

app.get('/bookings', (req: Request, res: Response) => {
  let sql = 'SELECT * FROM booking';
  connection.query(sql, (err: any, rows: any) => {
    if (err) throw err;
    console.log(rows);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(rows));
    console.log(rows);
  });
});

app.get('/rooms', (req: Request, res: Response) => {
  let sql = 'SELECT r.room_id, r.number, rt.type, r.price, r.image, r.description  FROM roomtype rt INNER JOIN room r ON r.type_id = rt.type_id ';
  connection.query(sql, (err: any, rows: any) => {
    if (err) throw err;
    console.log(rows);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(rows));
    console.log(rows);
  });
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


app.post('/createroom', (req: Request, res: Response) => {
  let data = { number: req.body.number, price: req.body.price, description: req.body.description, image: req.body.image, roomtype_id: req.body.roomtype_id };
  let sql = "INSERT INTO room (number, price, description, image, roomtype_id) VALUES ('" + req.body.number + "', '" + req.body.price + "', '" + req.body.description + "', '" + req.body.image + "', '" + req.body.roomtype_id + "')";
  connection.query(sql, data, (err: any, results: any) => {
    if (err) throw err;
    res.redirect('/rooms');
  })
});

app.post('/createbooking/', (req: Request, res: Response) => {
 
  console.log(req.query);
  const { startDate, endDate, room_id ,user_id } = req.body;
  const formattedStartDate = new Date(startDate).toISOString().slice(0, 19).replace('T', ' ');
  const formattedEndDate = new Date(endDate).toISOString().slice(0, 19).replace('T', ' ');

  if (room_id) {
    connection.query('INSERT INTO booking (startDate, endDate, room_id, user_id) VALUES (?, ?, ?, ?)', [formattedStartDate, formattedEndDate, room_id, user_id], (error, results, fields) => {
      if (error) {
        // Handle error here
        console.log(error);
        res.status(500).send("Error creating booking");
      } else {
        res.status(200).send("Booking created successfully, these are the dates: " + formattedStartDate + ',' + formattedEndDate);
      }
    });
  } else {
    res.status(400).send("Invalid room ID");
  }
});

app.get('/users', (req: Request, res: Response) => {
  let sql = 'SELECT * FROM user';
  connection.query(sql, (err: any, rows: any) => {
    if (err) throw err;
    console.log(rows);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(rows));
    console.log(rows);
  });
});


app.post('/showRooms', (req: Request, res: Response) => {
  let sql = `SELECT r.*, roomtype.* , CASE WHEN (b.room_id IS NOT NULL) THEN 'Not Available' ELSE 'Available' END AS availability FROM room r INNER JOIN roomtype ON roomtype.type_id = r.type_id LEFT JOIN booking b ON r.room_id = b.room_id WHERE (b.startDate NOT BETWEEN '${req.body.startDate}' AND '${req.body.endDate}') OR (b.endDate NOT BETWEEN '${req.body.startDate}' AND '${req.body.endDate}') OR (b.room_id IS NULL) GROUP BY r.room_id`;
  ;
  connection.query(sql, (err: any, rows: { availability: any; }) => {
    console.log(rows);
    if (err) throw err;
    res.send(JSON.stringify(rows));

  })
});

app.post('/signup', (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (!password) {
    res.status(400).send({ error: 'Password is required' });
    return;
  }
  let query = connection.query(
    "INSERT INTO user (username, password) VALUES (?, ?)",
    [username, password],
    (error: any, results: any) => {
      if (error) {
        console.log(error);
        res.status(500).send({ error: 'An error occurred while creating the user' });
        return;
      }
      res.sendStatus(200);
    }
  );
});


app.post('/login', (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  let data = connection.query(
    'SELECT * FROM user WHERE username = ?',
    [username],
    (error: any, results: string | any[]) => {
      if (error) {
        res.status(500).send({ error: 'An error occurred while executing the query' });
        return;
      }

      if (results.length === 0) {
        res.send({ error: 'User not found' });
        return;
      }

      const user = results[0];
      if (password === user.password) {
        if (user.isAdmin) {
          res.send({ success: true, isAdmin: true });
        } else {
          res.send({ success: true, isAdmin: false, user: user.user_id });
        }
      } else {
        res.send({ error: 'Incorrect password' });
      }
    }
  );
});

app.listen(1000, () => {
  console.log('Server is running at port 1000');
});

