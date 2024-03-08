const { Router } = require('express');

const login = (pool) => {
  const router = Router();

  router.get('/', (req, res) => {
    const { Username, passward } = req.body;
    const query = `
      SELECT *
      FROM user_profile
      WHERE username LIKE ? AND passward LIKE ?`;

    pool.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }

      connection.query(query, [Username, passward], (err, rows) => {
        connection.release();

        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }

        if (!rows || rows.length === 0) {
          res.status(404).send('Please Login');
          return;
        }

        // Assuming you want to check the password match here
        if (passward === rows[0].passward) {
          req.session.isAuthenticated = true;
          res.json(rows);
        } else {
          req.session.isAuthenticated = false;
          res.status(401).send('Invalid username or password');
        }
      });
    });
  });

  return router;
};

module.exports = login;
