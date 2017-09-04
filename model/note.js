var Sequelize = require('sequelize')
var path = require('path')

var sequelize = new Sequelize(undefined,undefined,undefined, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: path.join(__dirname,'../database/database.sqlite')
});
//测试模块
/*
sequelize
  .authenticate()
  .then(function(err) {
      console.log('Connection has been established successfully.'); //成功时候调用
  })
  .catch(function(err) {
      console.log('Unable to connect to the database:',err); 
  });
*/
// note-id text  user-Id create-time modify-time

var Note = sequelize.define('note',{  //定义一个表数据
    text: {
        type: Sequelize.STRING
    },
    uid: {
        type: Sequelize.STRING
    }
});

// // Note.drop()
Note.sync();


// Note.drop() //删除一个表
// Note.sync().then(function() {          //创建数据表
//     Note.create({text: 'hello world'}); 
// }).then(function() {
//     Note.findAll({raw: true}).then(function(notes) {
//     console.log(notes)
//  })
// });
// Note.sync();
// Note.destroy({where: {id: 9}},function() {
//     console.log(arguments)
// })
// Note.drop();
Note.findAll({raw: true,where:{id:0}}).then(function(notes) {  //查询id等于1的所有数据
    console.log(notes)
})

module.exports.Note = Note;
