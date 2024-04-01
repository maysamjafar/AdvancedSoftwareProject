
 
const pool = require('../database/db.js');
 const  getAllProjects = async(req, res)=>{
    pool.query("select * from craft_project",[],(error,result)=>{
        if(error) res.send(error);
        if(result) res.send(result);
    })
}

 const  getProject = async(req, res) => {
    const { id } = req.params;
    
    pool.query("SELECT * FROM craft_project WHERE project_id = ?",[id],(error,result)=>{
        if (error) {
            console.error('Error querying MySQL:', error);
            return res.status(500).json({ message: 'Internal server error' });
          }
      
          if (result.length === 0) {
            return res.status(400).json({ message: 'Invalid project_id' });
          }
        if(result) res.send(result);
    })
  }

   const addProject= async(req, res) => {
    const {title, description, difficulty_level, materials, group_size} = req.body;
    pool.query(
        'INSERT INTO craft_project (title, description, difficulty_level, materials, group_size) VALUES (?,?, ?, ?, ? )',
        [title, description, difficulty_level, materials, group_size],
       async (err, results) => {
          if (err) {
            console.error('Error inserting into MySQL:', err);
            return res.status(500).json({ message: 'Internal server error' });
          }
           res.json({ message: 'add project successful' });
        }
      );
  }

   const  deleteProject = async(req, res) => {
    const { id } = req.params;
    pool.query("delete FROM craft_project WHERE project_id = ?",[id],(error,result)=>{
        if (error) {
            console.error('Error querying MySQL:', error);
            return res.status(500).json({ message: 'Internal server error' });
          }
      
          if (result.length === 0) {
            return res.status(400).json({ message: 'Invalid project_id' });
          }
        if(result) res.send("Deleted Done");
    })
  }
   const  updateProject = async(req, res) => {
    const {title, description, difficulty_level, materials, group_size} = req.body;
    pool.query(
        'update craft_project set title =? , description =?, difficulty_level =?, materials =?, group_size =?',
        [title, description, difficulty_level, materials, group_size],
       async (err, results) => {
          if (err) {
            console.error('Error inserting into MySQL:', err);
            return res.status(500).json({ message: 'Internal server error' });
          }
           res.json({ message: 'update project successful' });
        }
      );
  };
  module.exports ={
    addProject,
    getAllProjects,
    getProject,
    deleteProject,
    updateProject
  }