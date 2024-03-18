const { response } = require('express');
const connectToDatabase = require('../database');

const createCollaboration = async (req, res) => {
    const { project_id, user_id, task_assignment, communication_tools } = req.body;

    // Size limitation validation
    console.log(req.body);
    if (task_assignment.length > 255 || communication_tools.length > 255) {
        return res.status(400).json({ error: 'Data size exceeds limits' });
    }

    const connection = await connectToDatabase();
    const sql = `INSERT INTO project_collaboration (project_id, user_id, task_assignment, communication_tools) VALUES (?, ?, ?, ?)`;
    const values = [project_id, user_id, task_assignment, communication_tools];

    try {
        connection.query(sql, values, function (err, result) {
            if (err) {
                console.error('Error creating collaboration: ' + err.message);
                console.log(error.stack)

                return res.status(500).json({ error: 'Error creating collaboration' });
            } else {
                console.log('Collaboration created successfully');
                return res.status(201).json({ success: 'Collaboration created successfully' });
            }
        });
    } catch (error) {
        console.error('Error creating collaboration: ' + error.message);
        console.log(error.stack)
        return res.status(500).json({ error: 'Error creating collaboration' });
    } finally {
        connection.end();
    }

}
//module.exports = {createCollaboration,};
const deleteCollaboration = async (req, res) => {
    const collaborationId = req.params.collaborationId; // Assuming the collaboration ID is passed as a URL parameter

    const connection = connectToDatabase();
    const sql = `DELETE FROM project_collaboration WHERE collaboration_id = ` + collaborationId;

    try {
        connection.query(sql, [collaborationId], function (err, result) {
            if (err) {
                console.error('Error deleting collaboration: ' + err.message);
                return res.status(500).json({ error: 'Error deleting collaboration' });
            } else {
                console.log('Collaboration deleted successfully');
                return res.status(200).json({ success: 'Collaboration deleted successfully' });
            }
        });
    } catch (error) {
        console.error('Error deleting collaboration: ' + error.message);
        return res.status(500).json({ error: 'Error deleting collaboration' });
    } finally {
        connection.end();
    }
}


const getCollaboration = async (req, res) => {
    const collaborationId = req.params.collaborationId; // Assuming the collaboration ID is passed as a URL parameter

    const connection = connectToDatabase();
    const sql = `SELECT * FROM project_collaboration WHERE collaboration_id = ` + collaborationId;

    try {
        connection.query(sql, [collaborationId], function (err, result) {
            if (err) {
                console.error('Error fetching collaboration: ' + err.message);
                return res.status(500).json({ error: 'Error fetching collaboration' });
            } else if (result.length === 0) {
                return res.status(404).json({ error: 'Collaboration not found' });
            } else {
                console.log('Collaboration fetched successfully');
                return res.status(200).json({ success: 'Collaboration fetched successfully', data: result[0] });
            }
        });
    } catch (error) {
        console.error('Error fetching collaboration: ' + error.message);
        return res.status(500).json({ error: 'Error fetching collaboration' });
    } finally {
        connection.end();
    }
}


const updateCollaboration = async (req, res) => {
    const { task_assignment, communication_tools } = req.body;
    const collaborationId = req.params.collaborationId; // Assuming the collaboration ID is passed as a URL parameter

    const connection = connectToDatabase();
    const sql = 'UPDATE project_collaboration SET task_assignment = ?, communication_tools = ? WHERE collaboration_id = ?';
    try {
        connection.query(sql, [task_assignment, communication_tools, collaborationId], (err, result) => {
            if (err) {
                console.error('Error updating collaboration: ' + err.message);
                return res.status(500).json({ error: 'Error updating collaboration' });
            } else if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Collaboration not found' });
            }else {
                console.log('Collaboration updated successfully'); 
                return res.status(200).json({ success: 'Collaboration updated successfully',data:result});
            }
        });
    } catch (error) {
        console.error('Error updating collaboration: ' + error.message);
        return res.status(500).json({ error: 'Error updating collaboration' });
    } finally {
        connection.end();
    }
}



module.exports = { createCollaboration, deleteCollaboration, getCollaboration, updateCollaboration };




