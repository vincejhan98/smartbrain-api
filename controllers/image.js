//move clarifai to backend to hide API key from hackers
const clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'f037075cc7ed4c818ebe30b26afd8169'
});

const handleApiCall = (req, res) => {
  app.models
  .predict("a403429f2ddf4b49b307e318f00e528b", req.body.input )
  .then(data => {
      res.json(data);
  })
  .catch(err => res.status(400).json('unable to work with api'));
}

const handleImage = (req,res,db) => {
    const { id } = req.body;
    db('users').where('id', '=', id) //if the id equals the one we have in the body
    .increment('entries', 1) //increment entries by 1
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json(err));
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}