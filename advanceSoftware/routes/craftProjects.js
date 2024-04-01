
const express = require('express');
const {getAllProjects,getProject,addProject,deleteProject,updateProject} = require ("../controllers/craft_project.js")
const projectRouter = express.Router();

projectRouter.get("/", getAllProjects);

projectRouter.post("/addProject",addProject); 

projectRouter.get("/:id", getProject);

projectRouter.delete("/:id",deleteProject);
projectRouter.patch("/:id",updateProject);
 
module.exports =projectRouter;
