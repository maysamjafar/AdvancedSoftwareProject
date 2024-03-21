const pool =require("../../config/database");
const currentEmail = require('./user.controller');
module.exports={
    create:(data,callback)=>{
        pool.query(
            `insert into user_profile(user_id,username,email,password,craft_skills,craft_interests,created_at,updated_at)
                 values(?,?,?,?,?,?,?,?) `,
            [
                data.user_id,
                data.username,
                data.email,
                data.password,
                data.craft_skills,
                data.craft_interests,
                data.created_at,
                data.updated_at
            ],
            (error,results,fields)=>{
                if (error){
                    return callback(error)
                }
                return callback(null,results)
            }
        );
    },
    getUserByEmail : (email, callBack) => {
        pool.query(
            `select * from user_profile where email =?`,
            [email],
            (error, results, fields) => {
                if (error) {
                 return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    deleteCurrentUser : ( callBack) => {
        const email = currentEmail.PUBLIC_currentLoggedInUserEmail ;
        pool.query(
          `select user_id from user_profile where email= ?`,
          [email],
          (error, results, fields) => {
            if (error) {
              return callBack(error);
            }
            //test        
            console.log (results[0].user_id);
            if (results){
              pool.query(
                `delete from user_profile where user_id = ?`,
                [results[0].user_id],
                (error, results, fields) => {
                    if (error) {
                     return callBack(error);
                    }
                    return callBack(null, results);
                } 
            )
            }
            else{
              return callBack(null,null);
            }
        }
        );
    },
    updateCurrentUser : (data, callBack) => {
        const email = currentEmail.PUBLIC_currentLoggedInUserEmail;
        pool.query(
          `select user_id from user_profile where email= ?`,
          [email],
          (error, results, fields) => {
            if (error) {
              return callBack(error);
            }
            if (results){
              pool.query(
                `update user_profile set username =?,email =?,password =?,craft_skills =?,craft_interests =?,created_at =?,updated_at =? where user_id=?`
                ,[
                    data.username,
                    data.email,
                    data.password,
                    data.craft_skills,
                    data.craft_interests,
                    data.created_at,
                    data.updated_at,
                    results[0].user_id 
                ],
                (error, results, fields) => {
                    if (error) {
                     return callBack(error);
                    }
                    return callBack(null, results);
                } 
            );
            }
            else{
              return callBack(null,null);
            }
        }
        ); 
    }, 
    getUsersByUserName : (UserName, callBack) => {
        pool.query(
            `select email,craft_skills,craft_interests from user_profile where 
            username like ?`,
            [`%${UserName}%`] ,
            (error, results, fields) => {
                if (error) {
                 return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserIsAdmin : (user_id,callBack) =>{
        pool.query(
          `select IsAdmin from user_profile where user_id = ?`,
          [user_id] ,
          (error, results, fields) => {
              if (error) {
               return callBack(error);
              }
              return callBack(null, results);
          }
      );
    },

    getUsers:callback=>{
        pool.query(
            `select user_id,username,email,password,craft_skills,craft_interests,created_at,updated_at from user_profile `,
             [],
             (error,results,fields) =>{
                if(error){
                    return callback(error);
                }
                return callback(null,results);
             }
        );
    },
    // getUserByUserId:(user_id,callback)=>{
    //     pool.query(
    //         `select user_id,username,email,password,craft_skills,craft_interests,created_at,updated_at from user_profile where user_id = ?`,
    //          [user_id],
    //          (error,results,fields) =>{
    //             if(error){
    //                 return callback(error);
    //             }
    //             return callback(null,results[0]);
    //          }
    //     );
    // },
    // updateUsers: (data,callback) =>{
    //     pool.query(`update user_profile set username =?,email =?,password =?,craft_skills =?,craft_interests =?,created_at =?,updated_at =? where user_id=?`,
    //      [
    //         data.username,
    //         data.email,
    //         data.password,
    //         data.craft_skills,
    //         data.craft_interests,
    //         data.created_at,
    //         data.updated_at,
    //         data.user_id
    //      ],
    //      (error, results , fields) => {
    //         if(error){
    //             callback(error);
    //         }
    //         return callback(null,results);
    //       }

    //     );
    // },
    // deleteUser: (data,callback) => {
    //     pool.query(

    //         `delete from user_profile where user_id =?`,
    //         [data.id],
    //         (error,results,fields) => {
    //             if(error){
    //                 callback(error);
    //             }
    //             return callback(null,results[0]);
    //         }
    //     );
    // },
    
};



