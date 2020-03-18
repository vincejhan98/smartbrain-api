const handleProfileGet = (req,res, db) => {
   const { id } = req.params;
   
   db.select('*').from('users').where({id}) //where id is what we received in the params
   .then(user => {
       if(user.length) {
           res.json(user[0]);
       } else {
           res.status(400).json('Not found');
       }
   })
   .catch(err => res.status(400).json(err, 'Not found'));
   
}

module.exports = {
    handleProfileGet: handleProfileGet
}