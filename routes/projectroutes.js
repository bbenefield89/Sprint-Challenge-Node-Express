const express = require('express');
const router = express.Router();

const db = require('../data/helpers/projectModel');

// error handler messages
const errorMessages = {
  defaultErr: 'Something has gone horribly wrong. Check back later',
  fourOhFour: 'Could not find resource'
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