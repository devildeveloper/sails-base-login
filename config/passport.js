var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
var bcrypt=require('bcrypt');

passport.serializeUser(function(user,done){
	done(null,user.id);
});
passport.deserializeUser(function(id, done) {
    User.findOne({ id: id } , function (err, user) {
        done(err, user);
    });
});
passport.use(new LocalStrategy({
	usernameField:'email',
	passwordField:'passwd'
},function(email,passwd,done){
	User.findOne({email:email})
		.exec(function(err,user){
			console.log(user)
			if(err) return done(err);
			if(!user) return done(null,false,{message:'Incorrect email.'});
			bcrypt.compare(passwd,user.passwd,function(err,res){
				if(!res) return done(null,false,{message:'Invalid password'});
				var token={
					email:user.email,
					id:user.id,
					name:user.name
				}
				return done(null,token,{message:'logged in successfully'});
			});
		});
}))