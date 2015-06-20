/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcrypt');
module.exports = {

  attributes: {
  	name:{
  		type:'string',
  		required:true
  	},
  	email:{
  		type:'email',
  		required:true
  	},
  	passwd:{
  		type:'string',
  		required:true
  	},
  	status:{
  		type:'boolean',
  		defaultsTo:1
  	}
  },
  beforeCreate:function(user,cb){
  	bcrypt.genSalt(10,function(err,salt){
  		bcrypt.hash(user.passwd,salt,function(err,hash){
  			if(err){
  				console.log(err);
  				cb(err);
  			}else{
  				user.passwd=hash;
  				cb();
  			}
  		})
  	});
  }
};

