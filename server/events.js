const db = require('./pghelper');

const findAll = (req, res, next) => {
  const sql = 'SELECT * FROM events ORDER BY id';

  db.query(sql)
    .then(eventList => res.json({ events: eventList }))
    .catch(next);
};

const findById = (req, res, next) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM events WHERE id = $1';

  db.query(sql, [id])
    .then((event) => {
      res.json(event[0]);
    })
    .catch(next);
};

const editById = (req, res, next) => {
  const title = req.query.title;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const category = req.query.category;
  const description = req.query.description;
  const featured = req.query.featured;
  const updated = req.query.updated;
  const id = req.params.id;
  const sql = 'UPDATE events SET title=$1, startDate=$2, endDate=$3, category=$4, description=$5, featured=$6, updatedAt=$7 WHERE id=$8';
  const selectSql = 'SELECT * FROM events WHERE id = $1';

  db.query(sql, [title, startDate, endDate, category, description, featured, updated, id])
    .then(() => {
      db.query(selectSql, [id])
        .then(event => res.json(event[0]))
        .catch(next);
    })
    .catch(next);
};

const addEvent = (req, res, next) => {
  const title = req.query.title;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const category = req.query.category;
  const description = req.query.description;
  const featured = req.query.featured;
  const updated = req.query.updated;
  const sql = 'INSERT INTO events (title, startDate, endDate, category, description, featured, updatedAt) VALUES ($1, $2, $3, $4, $5, $6, $7)';
  const selectSql = 'SELECT * FROM events WHERE title = $1';

  db.query(sql, [title, startDate, endDate, category, description, featured, updated])
    .then(() => {
      db.query(selectSql, [title])
        .then(event => res.json(event[0]))
        .catch(next);
    })
    .catch(next);
};

const removeEvent = (req, res, next) => {
  const id = req.params.id;
  const sql = 'DELETE FROM events WHERE id = $1';

  db.query(sql, [id])
    .then(() => res.json({ status: 'success', message: 'Successfully removed the event' }))
    .catch(next);
};

exports.findAll = findAll;
exports.findById = findById;
exports.editById = editById;
exports.addEvent = addEvent;
exports.removeEvent = removeEvent;
