// const router =require("express").Router();
// const { createUser ,getUserByUserId ,getUsers ,
//     updateUsers ,deleteUser ,getUserByEmail ,login}  =
//      require("./user.controller");
// const { checkToken } = require("../../auth/token_validation");

// router.post("/", checkToken ,createUser);
// router.get("/", checkToken ,getUsers);
// router.get("/:user_id", checkToken ,getUserByUserId);
// router.patch("/", checkToken ,updateUsers);
// router.delete("/", checkToken ,deleteUser);
// router.get("/:email", checkToken ,getUserByUserId);
// router.post("/login",login);



const router = require("express").Router();
const {createUser,deleteCurrentUser,updateCurrentUser,login,logout
    ,getUsersByUserName} = require("./user.controller");
const {checkToken}= require("../../auth/token_validation");
router.post("/",createUser);
router.post("/login",login);
router.post("/logout",checkToken,logout);
router.get("/:UserName",checkToken,getUsersByUserName);
router.delete("/",checkToken,deleteCurrentUser);
router.patch("/",checkToken,updateCurrentUser );
module.exports=router;