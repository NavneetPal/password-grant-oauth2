require('dotenv').config();
const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const oAuthModel = require('./authorisation/accessTokenModel')
const oAuth2Server=require('node-oauth2-server');
app.oauth = oAuth2Server({
    model: oAuthModel,
    grants: ['password'],
    debug: true
})
const authRoutesMethods=require('./authorisation/authRoutesMethod');
const authRoutes=require('./authorisation/authRoutes')(express.Router(),app,authRoutesMethods);
const restrictedAreaRoutesMethods = require('./restrictedArea/restrictedAreaRoutesMethods.js')
const restrictedAreaRoutes = require('./restrictedArea/restrictedAreaRoutes.js')(express.Router(), app, restrictedAreaRoutesMethods)
  
app.use(bodyParser.urlencoded({extended:true}))

app.use(app.oauth.errorHandler())

app.get('/',(req,res)=>{
    res.send(' Its Working');
})
const accessTokenModel=require('./models')['accessToken']
app.get('/token',async(req,res)=>{
    const tokens=await accessTokenModel.findOne({
        where:{
                accessToken:"a602a38bcaa4e76eea1972764dc9a4c461b6d204"
        },
        attributes:['userId']
    });
    res.json({
        tokens:tokens,
        id:tokens['userId']
    });
})

app.use('/auth',authRoutes);
app.use('/restrictedArea', restrictedAreaRoutes);


const PORT=9000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});