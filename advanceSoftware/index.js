 
 
const express = require('express');
const bodyParser = require('body-parser');
const projectRouter = require('./routes/craftProjects.js');
const finishProjectRouter = require('./routes/finishedProjects.js');
const whatsappclient = require("./services/WhatsappClient.js")
const messageRouter = require("./routes/messageRouter.js")

whatsappclient.initialize()

const app = express();
const PORT = 3005;
app.use(bodyParser.json());
app.use("/projects", projectRouter);
app.use("/finish-projects", finishProjectRouter);
app.use("/massage", messageRouter);
app.get("/", (req, res) => {
  console.log("test");
  res.send("Hello from home page");
});
app.listen(PORT, () => console.log(`server running`));
