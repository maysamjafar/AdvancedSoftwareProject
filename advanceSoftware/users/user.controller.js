// const axios = require('axios')
// const { create ,getUserByUserId,getUsers,updateUsers,
//   deleteUser,getUserByEmail } = require ("./user.service");

// const { genSaltSync , hashSync , compareSync} =require("bcrypt"); 
// const { sign } =require ("jsonwebtoken")

const axios = require('axios')
const { create, getUsers, getUserByEmail, updateCurrentUser, deleteCurrentUser
  , getUsersByUserName, getUserIsAdmin } = require("./user.service");
  //const { genSaltSync, hashSync } = require('bcrypt');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require("jsonwebtoken");
const activeSessions = {};
let currentemail = '';

module.exports = {
    createUser: (req,res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password,salt);
        create(body,(err,results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    Message:"database connection failed"
                });
            }

            return res.status(200).json({
                success:1,
                data: results
            });
        });
    },
    getUsers: (req, res) => {
      getUsers((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          data: results
        });
      });
    },
    getUserByEmail: (req, res) => {
    const email = req.params.email;
    getUserByEmail(email, (error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found"
        });
      }
      results.password = undefined;
      return res.json({
        success: 1,
        data: results
      });
    });
    },
  //   login: (req, res) => {
  //     const body = req.body;
  //     getUserByEmail(body.email, (error, results) => {
  //       if (error) {
  //         console.log(error);
  //       }
  //       if (!results) {
  //         return res.json({
  //           success: 0,
  //           data: "Invalid email or password !"
  //         });
  //       }
  //         const result = compareSync(body.password, results.password);
  //         if (result) {
  //           results.password = undefined;
  //           const jsontoken = sign({result:results}, "qwe1234", {
  //              expiresIn: "1h" });
  //           return res.json(
  //             {
  //               success: 1,
  //               message: "login done successfully !",
  //               token: jsontoken
  //             });
  //         } else {
  //             return res.json({
  //             success: 0,
  //             data: "Invalid email or password !!"
           
  //         });
          
  //     }
      
  // });
    
  //   },
    login: (req, res) => {
    const body = req.body;
    exports.PUBLIC_currentLoggedInUserEmail = body.email;
    currentemail = body.email;
    getUserByEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        currentemail = '';
        return res.json({
          success: 0,
          data: "Invalid email or password !"
        });
      }
      //console.log();
      let isAdmin;
      getUserIsAdmin(results.user_id, (err1, results1) => {
        if (err1) {
          console.log(err1);
        }
        if (results1) {
          //currentemail = '';
          isAdmin = results1[0].IsAdmin || false;
          // to ensure synchronous operations so the other code will completed 
          //after this method complete, then the isAdmin is defined
          executeOtherCode(isAdmin);
        }
      });
      function executeOtherCode(isAdmin) {
        const passwordNotMatch = compareSync(body.password, results.password);
        console.log("IS Admin outside: " + isAdmin);
        if (!passwordNotMatch) {
          results.password = undefined;
          const payload = { result: { ...results, isAdmin } };
          jsontoken = sign(payload, "qwe1234", { expiresIn: "10m" });
          activeSessions[exports.PUBLIC_currentLoggedInUserEmail] = true;
          return res.json(
            {
              success: 1,
              message: "login done successfully !",
              token: jsontoken
            });
        } else {
          currentemail = '';
          return res.json({
            success: 0,
            data: "Invalid email or password !!"
          });
        }
      }
    });
    },
    logout: (req, res) => {
      if (activeSessions[exports.PUBLIC_currentLoggedInUserEmail]) {
        activeSessions[exports.PUBLIC_currentLoggedInUserEmail] = false;
        currentemail = '';
        console.log("from logout1:" + exports.PUBLIC_currentLoggedInUserEmail);
        return res.json({
          success: 1,
          message: "Logout successful"
        });
      }
      else {
        console.log("from logout2:" + exports.PUBLIC_currentLoggedInUserEmail);
        return res.json({
          success: 0,
          data: "User not currently logged in"
        });
      }
    },
    getUsersByUserName: (req, res) => {
      if (activeSessions[exports.PUBLIC_currentLoggedInUserEmail]) {
  
        const username = req.params.username;
        getUsersByUserName(username, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          if (!results) {
            return res.json({
              success: 0,
              message: "There are no users with this username!"
            });
          }
          results.password = undefined;
          return res.json({
            success: 1,
            data: results
          });
        });
      } else {
        return res.json({
          success: 1,
          message: "you are logged out !"
        });
  
      }
    },
    deleteCurrentUser: (req, res) => {
      if (activeSessions[exports.PUBLIC_currentLoggedInUserEmail]) {
        deleteCurrentUser((err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          if (results.affectedRows == 0) {
            return res.json({
              success: 0,
              message: "not found"
            });
          }
          return res.json({
            success: 1,
            message: "deleted!"
          });
        });
      } else {
        return res.json({
          success: 1,
          message: "you are logged out !"
        });
  
      }
    },
    updateCurrentUser: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, 10);
      //body.password = hashSync(body.password, salt);
      if (activeSessions[exports.PUBLIC_currentLoggedInUserEmail]) {
        updateCurrentUser(body, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          if (results.affectedRows == 0) {
            return res.json({
              success: 0,
              message: "not found"
            });
          }
          return res.json({
            success: 1,
            message: "updated!"
          });
        });
      } else {
        return res.json({
          success: 1,
          message: "you are logged out !"
        });
      }
    },
    getCurrenUserEmail: () => {
      //console.log("in user controller get "+currentemail );
      return currentemail;
    },
    getUserIsAdmin: (req, res) => {
      getUserIsAdmin(userId, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          data: results
        });
      });
    },
    // getUserByUserId: (req, res) => {
    //     const user_id = req.params.user_id;
    //     getUserByUserId(user_id, (error, results) => {
    //       if (error) {
    //         console.log(error);
    //         return;
    //       }
    //       if (!results) {
    //         return res.json({
    //           success: 0,
    //           message: "Record not Found"
    //         });
    //       }
    //       return res.json({
    //         success: 1,
    //         data: results
    //       });
    //     });
    // },
    // updateUsers: (req, res) => {
    //     const body = req.body;
    //     const salt = genSaltSync(10);
    //     body.password = hashSync(body.password, salt);
    //     updateUsers(body, (error, results) => {
    //         if (error) {
    //           console.log(error);
    //           return;
    //         }
    //         return res.json({
    //             success: 1,
    //             message: "updated successfully"
    //         }); 
    //     });
    // },
    // deleteUser: (req, res) => {
    //     const data = req.body;
    //       deleteUser((error, results) => {
    //         if (error) {
    //           console.log(error);
    //           return;
    //         }
    //         if (!results) {
    //           return res.json({
    //             success: 0,
    //             message: "not found"
    //           });
    //         }
    //         return res.json({
    //           success: 1,
    //           message: "deleted!"
    //         });
    //     });
    // },
    

}






  
