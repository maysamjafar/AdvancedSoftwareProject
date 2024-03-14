
const pool = require('../database/db.js');

  const getAllProjects = async(req, res)=>{
    pool.query("select * from finished_projects",[],(error,result)=>{
        if(error) res.send(error);
        if(result) res.send(result);
    })
}

  const  getProject = async(req, res) => {
    const { id } = req.params;
    pool.query("SELECT * FROM finished_projects WHERE finished_project_id = ?",[id],(error,result)=>{
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
    const {project_id,user_id, image_url, description} = req.body;
    pool.query(
        'INSERT INTO finished_projects (project_id,user_id, image_url, description) VALUES (?,?,?,?)',
        [project_id,user_id, image_url, description],
       async (err, results) => {
          if (err) {
            console.error('Error inserting into MySQL:', err);
            return res.status(500).json({ message: 'Internal server error' });
          }
           res.json({ message: 'add finished project successful' });
        }
      );
  }

    const  deleteProject = async(req, res) => {
    const { id } = req.params;
    pool.query("delete FROM finished_projects WHERE finished_project_id = ?",[id],(error,result)=>{
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
    const {project_id,user_id, image_url, description} = req.body;
    pool.query(
        'update finished_projects set project_id =? , user_id =? ,  image_url =? , description =?',
        [project_id,user_id, image_url, description],
       async (err, results) => {
          if (err) {
            console.error('Error inserting into MySQL:', err);
            return res.status(500).json({ message: 'Internal server error' });
          }
           res.json({ message: 'update finished project successful' });
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