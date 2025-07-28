const passport = require("passport")

// exports.isAuth = (req,res,done) => {
//    return passport.authenticate('jwt')
// }
exports.isAuth =  (req, res, done) => {
    return passport.authenticate('jwt');
  };
  
exports.sanitizeUser = (user) => {
    return{id:user.id, role:user.role}
}

exports.cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
        console.log("atul : " , token);
        
    }
    // TODO: this is temporary token for testing without cookie
    // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N2U2ZTM0OGI5MzVjZjhkYmFhMDQyMyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzM2MzM4OTk2fQ.gkfLN45XhlCfCSOhG2BkwFExfRp31WOfOh6xOnwBpWE";

    return token;
  };
    