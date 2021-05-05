const {Sequelize} = require('sequelize');
const config=require('../config/config.json')['development'];
const {username,password,database,host,dialect}=config;
const chalk=require('chalk');
const sequelizeConfig={
    host:host,
    dialect:dialect,
}

const sequelize = new Sequelize(database, username, password,sequelizeConfig);

sequelize.authenticate()
.then(()=>{
    console.log(chalk.green('Database connected properly'));
})
.catch(err=>{
    console.log(`Database not connected properly bcz ${err.message}`)
})


sequelize.sync();

module.exports=sequelize;