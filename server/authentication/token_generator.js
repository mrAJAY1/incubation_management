const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = {
  genAccess: async (claims) => {
    const token = await jwt.sign(claims, process.env.ACCESS_KEY, {
      algorithm: "HS256",
      expiresIn: process.env.AT_LIFE,
    });
    return token;
  },
  genRefresh: async (claims) => {
    const token = await jwt.sign(claims, process.env.REFRESH_KEY, {
      algorithm: "HS256",
      expiresIn: process.env.RT_LIFE,
    });
    return token;
  },
  sendAccessCookie: (res, accessToken) => {
    res.cookie("access-token", accessToken, {
      httpOnly: true,
      // secure: true,
      maxAge: parseInt(process.env.AT_COOKIE_LIFE),
    });
    return;
  },
  sendRefreshCookie: (res, refreshToken) => {
    res.cookie("refresh-token", refreshToken, {
      httpOnly: true,
      // secure: true,
      maxAge: parseInt(process.env.RT_COOKIE_LIFE),
    });
    return;
  },
};
