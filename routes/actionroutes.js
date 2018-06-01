const express = require('express');
const router = express.Router();

const db = require('../data/helpers/actionModel');

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


/*************************
 ** ROUTE /:id **
 *************************/
// get
router.get('/:id', dbGet);

// insert
router.post('/:id', (req, res) => {
  const project_id = Number(req.params.id);
  const { description, notes } = req.body;
  const { defaultErr, postBadRequest } = errorMessages;
  const actions = { project_id, description, notes, completed: false };
  db.insert(actions)
    .then(data => {
      return (!description || !notes) ? error(res, 400, postBadRequest) : res.json(data);
    })
    .catch((err) => error(res, 500, defaultErr));
});

// update
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { project_id, description, notes, completed } = req.body;
  const { defaultErr } = errorMessages;
  const project = { project_id, description, notes, completed };
  db.update(id, project)
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

module.exports = router;