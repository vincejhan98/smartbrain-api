const handleRegister = (req,res,db, bcrypt)=> {
    const {email, name, password } = req.body;
    if (!email || !name || !password) {
        return res.status(400).json('incorrect form submission'); 
        //return so that rest of this file doesn't run
    }

    const hash = bcrypt.hashSync(password, 10);
        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                .returning('*')   //returns all columns
                .insert({
                    email: loginEmail[0], 
                    name: name, 
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0]);
                })
            })
            .then(trx.commit)
            .catch(trx.rollback)
        }).catch(err=> console.log(err));
        
    //.catch(err => res.status(400).json(err));

}

module.exports = {
    handleRegister: handleRegister
}