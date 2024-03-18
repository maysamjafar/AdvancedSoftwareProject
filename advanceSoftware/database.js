const mysql = require('mysql');

// Function to establish database connection
function connectToDatabase() {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'saf'
    });
    
    connection.connect(function(err) {
        if (err) {
            console.error('Error connecting to database: ' + err.stack);
            return;
        }
        console.log('Connected to database as id ' + connection.threadId);
    });

    return connection;
}
module.exports=connectToDatabase;