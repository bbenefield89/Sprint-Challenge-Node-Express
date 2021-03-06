const express = require('express');
const router = express.Router();

const db = require('../data/helpers/projectModel');

// error handler messages
const errorMessages = {
  defaultErr: 'Something has gone horribly wrong. Check back later',
  fourOhFour: 'Could not find resource',
  postBadRequest: 'Please provide a name and a description'
};

// TODO: automate the message used depending on the `statusCode` given
// error handler
const error = (res, statusCode, message) => {
  res.status(statusCode).json({ error: message });
}


/*************************
** CUSTOM MIDDLEWARE **
*************************/
// db.get()
const dbGet = (req, res) => {
  const { id } = req.params;
  const { defaultErr, fourOhFour } = errorMessages;
  db.get(id)
    .then(data => {
      return (data.length === 0) ? error(res, 404, fourOhFour) : res.json(data);
    })
    .catch(data => error(res, 500, defaultErr));
};

/*************************
** ROUTE / **
*************************/
// get
router.get('/', dbGet);

// insert
router.post('/', (req, res) => {
  const { name, description } = req.body;
  const { defaultErr, postBadRequest } = errorMessages;
  const project = { name, description, completed: false };
  db.insert(project)
    .then(data => {
      return (!name || !description) ? error(res, 400, postBadRequest) : res.json(data);
    })
    .catch(() => error(res, 500, defaultErr));
});

/*************************
** ROUTE /:id **
*************************/
// get
router.get('/:id', dbGet);

// update
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, completed } = req.body;
  const { defaultErr } = errorMessages;
  const project = { name, description, completed };
  db.insert(project)
    .then(data => res.json(data))
    .catch(() => error(res, 500, defaultErr));
});

// remove
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const { defaultErr, fourOhFour } = errorMessages;
  db.remove(id)
    .then(data => {
      (data) ? res.json(data) : error(res, 404, fourOhFour)
    })
    .catch(() => error(res, 500, defaultErr));
});

// getProjectActions
router.get('/:id/actions', (req, res) => {
  const { id } = req.params;
  const { defaultErr, fourOhFour } = errorMessages;
  db.getProjectActions(id)
    .then(data => {
      return (data.length === 0) ? error(res, 404, fourOhFour) : res.json(data);
    })
    .catch(() => error(error, 500, defaultErr));
});


module.exports = router;