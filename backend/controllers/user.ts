import { Request, Response } from 'express';
import connection from '../connection';

const showAllUsers = (req: Request, res: Response) => {
  let sql = "SELECT * FROM user";
  connection.query(sql, (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
};

const editUser = (req: Request, res: Response) => {
  const userId = req.params.id;
  let sql = `SELECT * FROM user WHERE user_id = ?`;
  connection.query(sql, [userId], (err, rows) => {
    console.log(rows)
    if (err) {
      console.log(err);
      console.log('An error occurred while retrieving user');
      res.status(500).send('An error occurred while retrieving user');
    } else if (rows.length === 0) {
      console.log('User not found');
      res.status(404).send('User not found');
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
};

const updateUser = (req: Request, res: Response) => {
  const userId = req.body.user_id;
  let data = req.body;
  let sql = `UPDATE user SET username = ?, password = ?, isAdmin = ? WHERE user_id = ?`;
  connection.query(sql, [data.username, data.password, data.isAdmin, userId], (error) => {
    if (error) {
      console.log(error);
      console.log('An error occurred while updating user');
      res.status(500).send('An error occurred while updating user');
    } else {
      console.log('User updated successfully');
      res.sendStatus(200);
    }
  });
};


const deleteUser = (req: Request, res: Response) => {
  const userId = req.query.id;
  let sql = `DELETE FROM user WHERE user_id = ?`;
  connection.query(sql, [userId], (err) => {
    if (err) throw err;
    console.log('User deleted successfully');
    res.sendStatus(200);
  });
};


const actions = {
  show: showAllUsers,
  edit: editUser,
  update: updateUser,
  delete: deleteUser
};

export default actions;
