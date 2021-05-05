const { QueryTypes } = require('sequelize');
const sequelize=require('../core/connection');
const chalk=require('chalk');
const User=require('../models')['User'];
const accessTokenModel=require('../models')['accessToken']
module.exports={
    getClient:(clientID,clientSecret,callback)=>{
         //create the the client out of the given params.
        //It has no functional role in grantTypes of type password
        const client = {
            clientID,
            clientSecret,
            grants: null,
            redirectUris: null
        }
    
        callback(false, client);
    },
    grantTypeAllowed:(clientID,grantType,callback)=>{
        callback(false, true);
    },
    getUser:(username,password,callback)=>{
        User.findOne({
            where:{
                username:username,
                password:password
            }
        }).then(
            user=>callback(false,user)
        )
        .catch(error=>callback(error,null))
    },
    saveAccessToken:async(accessToken,clientID,expires,user,callback)=>{
        accessTokenModel.create({
           accessToken:accessToken,
           userId:user.id
       }).then(token=>callback(false,token))
       .catch(error=>callback(error,null))
      /*  const getUserQuery=`INSERT INTO accesstokens (accessToken, userId) VALUES ("${accessToken}", ${user.id}) ON DUPLICATE KEY UPDATE accessToken = "${accessToken}";`
       sequelize.query(getUserQuery, { type: QueryTypes.INSERT },(dataResponseObject)=>{
           callback(dataResponseObject.error);
       }); */
    },
    getAccessToken:async(bearerToken,callback)=>{
        console.log(chalk.yellow(bearerToken));
        const token=await accessTokenModel.findOne({
            attributes:['userId'],
            where:{
                accessToken:bearerToken
            }
        });

        console.log(chalk.red(JSON.stringify(token)));

        const accessToken={
            user:{
                id:token['userId']
            },
            expires:null
        }
        const userID=token['userId']
        callback(userID == null ? true : false, userID == null ? null : accessToken)
    }
}