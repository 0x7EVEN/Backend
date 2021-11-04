const jwt = require("jsonwebtoken");

function authenticate (req, res, next) {
     const bearerToken = req?.headers?.authorization;
     if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
          return res.send("bearer token error");
     }

     const token = bearerToken.split(" ")[1];

     try {
          const user = verifyToken(token);
          req.user = user.user;
          return next();

     } catch (err) {
          if (!user) {
               return res.send("bearer token error");
          }
     }
}

function verifyToken (token) {
     return new Promise((resolve, reject) => {
          jwt.verify(token, "secretKey", function(err, decoded) {
               if (err) return reject(err);
               return resolve(decoded);
          });
     });
}