const connectToDatabase=require('../database');

const createCollaboration=async (req, res) => {
    const { project_id, user_id, task_assignment, communication_tools } = req.body;

    // Size limitation validation
    console.log(req.body);
    if (task_assignment.length > 255 || communication_tools.length > 255) {
        return res.status(400).json({ error: 'Data size exceeds limits' });
    }

    const connection = connectToDatabase();
    const sql = `INSERT INTO project_collaboration (project_id, user_id, task_assignment, communication_tools) VALUES (?, ?, ?, ?)`;
    const values = [project_id, user_id, task_assignment, communication_tools];

    try {
        connection.query(sql, values, function(err, result) {
            if (err) {
                console.error('Error creating collaboration: ' + err.message);
                return res.status(500).json({ error: 'Error creating collaboration' });
            } else {
                console.log('Collaboration created successfully');
                return res.status(201).json({ success: 'Collaboration created successfully' });
            }
        });
    } catch (error) {
        console.error('Error creating collaboration: ' + error.message);
        return res.status(500).json({ error: 'Error creating collaboration' });
    } finally {
        connection.end();
    }
//     try {
//         await insertCollaboration(connection, project_id, user_id, task_assignment, communication_tools);
//         console.log('Collaboration created successfully');
//         return res.status(201).json({ success: 'Collaboration created successfully' });
//     } catch (error) {
//         console.error('Error creating collaboration: ' + error.message);
//         return res.status(500).json({ error: 'Error creating collaboration' });
//     } finally {
//         connection.end();
//     }
}
module.exports = {createCollaboration,};