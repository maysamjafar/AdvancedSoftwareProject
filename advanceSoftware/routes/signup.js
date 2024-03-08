const { Router } = require('express');

const signup = (pool) => {
    const router = Router();

    router.post('/', (req, res) => {
        const { username, email, password, craft_skills, craft_interests } = req.body;
        const query = 'INSERT INTO user_profile (username, email, password, craft_skills, craft_interests, created_at, updated_at) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)';
        
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
                return;
            }

            connection.query(query, [username, email, password, craft_skills, craft_interests], (err, result) => {
                connection.release();

                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                    return;
                }

                res.send("User profile with ID: ${result.insertId} has been created.");
            });
        });
    });

    return router;
};

module.exports = signup;