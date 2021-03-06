//  this is the model which would correspond to our users table in db
//  dependencies
var bcrypt = require("bcrypt-nodejs")

//  creating user model and exporting
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {

    firstName: {
    type: DataTypes.STRING,
    allowNull: false
    },

    lastName: {
    type: DataTypes.STRING,
    allowNull: false
    },
    
    email: {

    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
        isEmail: true
        }
    },

    password: {
      type: DataTypes.STRING
    },

    bucket_id: {
      type: DataTypes.INTEGER
    },

    current_box: {
        type: DataTypes.INTEGER
    },

    ship_add1: {
        type: DataTypes.STRING
      },

    ship_add2: {
        type: DataTypes.STRING
      },

    ship_city: {
        type: DataTypes.STRING
      },
    
    ship_state: {
       type: DataTypes.STRING
     },

    ship_zip: {
        type: DataTypes.STRING
      },

    bill_add1: {
        type: DataTypes.STRING
      },

    bill_add2: {
        type: DataTypes.STRING
      },

    bill_city: {
        type: DataTypes.STRING
      },

    bill_state: {
        type: DataTypes.STRING
      },
    
    bill_zip: {
        type: DataTypes.STRING
      }
    });
    
 //===================================================================

  User.associate = function(models) {
    User.hasMany(models.Box, {
      onDelete: "cascade"
    })
  }

  User.assocciate = function(models) {
    User.hasMany(models.Order, {
      onDelete: "cascase"
    })
  }

  User.associate = function(models) {
    User.belongsToMany(models.Box, {
      through: models.UserBox,
      onDelete: "CASCADE"
    })
  }
  // //  ok so for each user -compare unhashed to hashed password
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
  }

  //  Hook method here so that way it auto hashes their password
  User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)
  })
  return User
}
