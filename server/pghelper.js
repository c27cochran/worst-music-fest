const pg = require('pg');
const config = require('./config');

const databaseURL = config.databaseURL;

const query = function query(sql, values, singleItem) {
  return new Promise((resolve, reject) => {
    pg.connect(databaseURL, (err, conn, done) => {
      if (err) return reject(err);
      try {
        conn.query(sql, values, (errConn, result) => {
          done();
          if (errConn) {
            reject(errConn);
          } else {
            resolve(singleItem ? result.rows[0] : result.rows);
          }
        });
      } catch (e) {
        done();
        reject(e);
      }
    });
  });
};

exports.query = query;
