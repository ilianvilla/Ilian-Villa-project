import connection from '../connection';

const deleteBooking = (req: { params: { id: any; }; }, res: { redirect: (arg0: string) => void; }) => {
    const id = req.params.id;
    let sql = `DELETE FROM booking WHERE id = ${id}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/bookings')
    });
};

const actions = {
    delete: deleteBooking
  };

export default actions;










