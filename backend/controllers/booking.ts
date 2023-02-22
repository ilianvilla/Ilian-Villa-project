import connection from '../connection';

const deleteBooking = (req: { params: { id: any; }; }, res: { redirect: (arg0: string) => void; }) => {
    const bookingId = req.params.id;
    let sql = `DELETE FROM booking WHERE booking_id = ${bookingId}`;
    connection.query(sql,(err) => {
        if(err) throw err;
        res.redirect('/bookings')
    });
};

const actions = {
    delete: deleteBooking
  };

export default actions;










