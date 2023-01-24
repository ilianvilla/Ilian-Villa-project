import connection from '../connection';

const showAllRoooms = (req: any, res: { render: (arg0: string, arg1: { title: string; room: any; }) => void; }) => {
    let sql = "SELECT r.id, r.number, rt.type, r.price, r.image, r.description  FROM roomtype rt INNER JOIN room r ON r.roomtype_id = rt.type_id ";
    let query = connection.query(sql, (err: any, rows: any) => {
        console.log(rows);
        if(err) throw err;
        res.render('room_index', {
            title : 'Room List',
            room : rows
            
        });
    
    });
};

const editRoom = (req: { params: { id: any; }; }, res: { render: (arg0: string, arg1: { title: string; room: any; }) => void; }) => {
    const id = req.params.id;
    let sql = `SELECT * FROM room WHERE id = ${id}`;
    let query = connection.query(sql, (err: any, rows: any[]) => {
        if(err) throw err;
        res.render('room_edit', {
            title : 'Room Edit',
            room : rows[0]
            
        });
    
    });
};

const updateRoom = (req: { body: { id: any; }; }, res: { redirect: (arg0: string) => void; }) => {
    const id = req.body.id;
    let data = req.body;
    let sql = `UPDATE room SET ? WHERE id = ${id}`;
    let query = connection.query(sql,data, (err: any, results: any) => {
      if(err) throw err;
      res.redirect('/rooms');
    });
};

const deleteRoom = (req: { params: { id: any; }; }, res: { redirect: (arg0: string) => void; }) => {
    const id = req.params.id;
    let sql = `DELETE FROM room WHERE id = ${id}`;
    let query = connection.query(sql,(err: any, result: any) => {
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







