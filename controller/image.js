const clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'd20cdd0858d54e46b70ddeb8f17e002a'
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(data=>{
      res.json(data)
    })
    .catch(err=>res.status(400).json('unable to work with api'))
}

const imageHandler = (req, res, db) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries=>{
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get count'))
}

module.exports = {
  imageHandler,
  handleApiCall
}
