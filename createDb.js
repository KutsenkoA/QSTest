var mongoose = require("./libs/mongoose.js"),
    User = require("./models/user.js"),
    async = require('async');

async.series([
  open,
  dropDatabase,
  createUsers
], function(err) {
  console.log(arguments);
  mongoose.disconnect();
  process.exit(err ? 255 : 0);
});

function open(callback) {
  mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
  var db = mongoose.connection.db;
  db.dropDatabase(callback);
  console.log('drop database');
}

function createUsers(callback) {

  var users = [
    {name: 'Администратор', login: 'admin', password: 'admin'},
    {name: 'Гость', login: 'guest', password: 'guest'},
    {name: 'Кулхакер', login: 'dF56#$sdfdf', password: '1'},
    {name: 'Генеральный директор', login: 'megaboss', password: 'lena'}
  ];

  async.each(users, function(userData, callback) {
    var user = new mongoose.models.User(userData);
    user.save(callback);
    console.log('create user: ' + userData.name);
  }, callback);
}
