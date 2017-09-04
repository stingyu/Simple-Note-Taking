var express = require('express');
var router = express.Router();
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

passport.serializeUser(function(user,done) { //session序列化
    console.log('---serializeUser----')
    console.log(user)
    done(null,user);
});

passport.deserializeUser(function(obj,done) {
    console.log('----deserializeUser---')
    done(null,obj);
});

passport.use(new GitHubStrategy({
    clientID: 'b093de8b02431c62760c',
    clientSecret: 'cd4150c886a5d7368947d942f1b20deb150dc060',
    callbackURL: "http://stingy.club/auth/github/callback"
   },
   function(accessToken,refreshToken,profile,done) {
    //    User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //        return cb(err,user);
    //    });
    done(null,profile);
   }
));
router.get('/logout',function(req,res) {  //注销
    req.session.destroy();
    res.redirect('/');
})
router.get('/github',
passport.authenticate('github'));

router.get('/github/callback',
passport.authenticate('github',{failureRedirect: '/login' }),
function(req,res) {
    req.session.user = {
        id: req.user.id,
        username: req.user.displayName || req.user.username,
        avatar: req.user._json.avatar_url,
        provider: req.user.provider
    };
    res.redirect('/');
});

module.exports = router;