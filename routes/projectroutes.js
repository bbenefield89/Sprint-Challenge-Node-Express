const express = require('express');
const router = express.Router();

const db = require('../data/helpers/projectModel');

const error = (res, statusCode, message) => {
  res.status(statusCode).json({ error: message });
}

/*************************
** CUSTOM MIDDLEWARE **
*************************/
// db.get()
const dbGet = (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(data => {
      return (data.length === 0) ? error(res, 404, 'Could not find resource') : res.json(data)
    })
    .catch(data => error(res, 500, 'Something has gone horribly wrong. Check back later'));
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

module.exports = router;