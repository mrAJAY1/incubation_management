const jwt = require("jsonwebtoken");
const { default: Redis } = require("ioredis");
const redis = new Redis();
const {
  sendAccessCookie,
  sendRefreshCookie,
  genAccess,
  genRefresh,
} = require("./token_generator");
const e = require("express");
module.exports = {
  verifyAccess: async (req, res, next) => {
    const accessToken = req.cookies.accessToken || null;
    const refreshToken = req.cookies.refreshToken || null;


    if (!accessToken || !refreshToken) {
      return res
        .status(401)
        .json({ status: "failed", error: "no token found" });
    }
    jwt.verify(accessToken, process.env.ACCESS_KEY, async (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          decoded = await jwt.verify(accessToken, process.env.ACCESS_KEY, {
            ignoreExpiration: true,
          });
          let redisToken = await redis.get(decoded.id, async (err, val) => {
            err ? null : val ? val : null;
          });
          redisToken = await JSON.parse(redisToken);
          if ( !redisToken||redisToken.refreshToken !== refreshToken||redisToken.expires<new Date().getTime()) {
            return res
              .status(401)
              .json({ status: "failed", error: "invalid token" });
          }  else {
            const newAccessToken = await genAccess({
              id: decoded.id,
              email: decoded.email,
              name: decoded.name,
            });
            sendAccessCookie(res, newAccessToken);
            next();
          }
        } else {
          res
            .status(401)
            .send({ status: "failed", error: "invalid token" });
        }
      } else {
        next();
      }
    });
  },
};
