/**
 * Created by tianhengzhou on 8/8/15.
 */
var db = require('./db'),
    crypto = require('crypto');

var userSchema = new db.Schema({
    name: String,
    password: String,
    email: String,
    head: String
}, {
    collection: 'users'
});

var userModel = db.model('User', userSchema);

function User(user) {
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
}

User.prototype.save = function (callback) {
    var md5 = crypto.createHash('md5'),
        email_md5 = md5.update(this.email.toLowerCase()).digest('hex'),
        head = "http://www.gravatar.com/avatar/" + email_md5 + "?s=32";
    var user = {
        name: this.name,
        password: this.password,
        email: this.email,
        head: head
    };
  var newUser = new userModel(user);

    newUser.save(function (err, user) {
        if (err) {
            return callback(err);
        }
        callback(null, user);
    });
};

User.get = function (name, callback) {
    userModel.findOne({name: name}, function (err, user) {
        if (err) {
            return callback(err);
        }
        callback(null, user);
    });
};
User.getimage = function (name, callback) {
    userModel.findOne({name: name}, function (err, user) {
        if (err) {
            return callback(err);
        }
        callback(null, user.head);
    });
};
module.exports = User;

