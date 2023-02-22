import connection from '../connection';
import { Request, Response } from 'express';

const showAllRoooms = (req: any, res: {
    send: any; render: (arg0: string, arg1: { title: string; room: any; }) => void; 
}) => {
    let sql = "SELECT r.id, r.number, rt.type, r.price, r.image, r.description  FROM roomtype rt INNER JOIN room r ON r.roomtype_id = rt.type_id ";
    connection.query(sql, (err: any, rows: any) => {
        console.log(rows);
        if(err) throw err;
        res.send(JSON.stringify(rows));
    
    });
};

const editRoom = (req: Request, res: Response) => {
    const roomId = req.params.id;
    let sql = `SELECT * FROM room WHERE room_id = ?`;
    connection.query(sql, [roomId], (err, rows) => {
      console.log(rows)
      if (err) {
        console.log(err);
        console.log('An error occurred while retrieving room');
        res.status(500).send('An error occurred while retrieving room');
      } else if (rows.length === 0) {
        console.log('Room not found');
        res.status(404).send('Room not found');
      } else {
        console.log(rows);
        res.json(rows);
      }
    });
  };
  
  const updateRoom = (req: Request, res: Response) => {
    const roomId = req.params.id;
    let data = req.body;
    let sql = `UPDATE room SET number = ?, image = ?, description = ?, price = ?, type_id = ? WHERE room_id = ?`;
    connection.query(sql, [data.number, data.image, data.description, data.price, data.type_id, roomId], (error) => {
      if (error) {
        console.log(error);
        console.log('An error occurred while updating room');
        res.status(500).send('An error occurred while updating room');
      } else {
        console.log('Room updated successfully');
        res.sendStatus(200);
      }
    });
  };
  

const deleteRoom = (req: { params: { id: any; }; }, res: { redirect: (arg0: string) => void; }) => {
    const id = req.params.id;
    let sql = `DELETE FROM room WHERE id = ${id}`;
    connection.query(sql,(err: any) => {
        if(err) throw err;
        res.redirect('/rooms')
    });
};    

const actions = {
    show: showAllRoooms, 
    edit: editRoom, 
    update: updateRoom, 
    delete: deleteRoom
  };
  
export default actions;







