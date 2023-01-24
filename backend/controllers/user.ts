import connection from '../connection';

const showAllUsers = (req: any, res: { render: (arg0: string, arg1: { title: string; user: any; }) => void; }) => {
    let sql = "SELECT * FROM user";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('user_index', {
            title : 'User List',
            user : rows
            
        });
    
    });
};

const editUser = (req: { params: { id: any; }; }, res: { render: (arg0: string, arg1: { title: string; user: any; }) => void; }) => {
    const id = req.params.id;
    let sql = `SELECT * FROM user WHERE id = ${id}`;
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('user_edit', {
            title : 'User Edit',
            user : rows[0]
            
        });
    
    });
};

const updateUser = (req: { body: { id: any; }; }, res: { redirect: (arg0: string) => void; }) => {
    const id = req.body.id;
    let data = req.body;
    let sql = `UPDATE user SET ? WHERE id = ${id}`;
    let query = connection.query(sql, data, (error, results) => {
      if(error) throw error;
      res.redirect('/users');
    });
}

const deleteUser = (req: { params: { id: any; }; }, res: { redirect: (arg0: string) => void; }) => {
    const id = req.params.id;
    let sql = `DELETE FROM user WHERE id = ${id}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/users')
    });
};

const actions = {
    show: showAllUsers, 
    edit: editUser, 
    update: updateUser, 
    delete: deleteUser
  };

export default actions;




    

