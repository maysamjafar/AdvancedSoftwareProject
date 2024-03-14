
const express = require('express');
const {getAllProjects,getProject,addProject,deleteProject,updateProject} = require('../controllers/finished_projects.js')
const finishProjectRouter = express.Router();

finishProjectRouter.get("/", getAllProjects);

finishProjectRouter.post("/addFinish",addProject); 

finishProjectRouter.get("/:id", getProject);

finishProjectRouter.delete("/:id",deleteProject);
finishProjectRouter.patch("/:id",updateProject);
 
module.exports =finishProjectRouter;
