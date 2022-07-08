const jwt = require("jsonwebtoken");

module.exports = {
  genAccess: async (claims) => {
    const token = await jwt.sign(claims, process.env.ACCESS_KEY, {
      algorithm: process.env.JWT_ALGO,
      expiresIn: process.env.AT_LIFE,
    });
    return token;
  },
  genRefresh: async (claims) => {
    const token = await jwt.sign(claims, process.env.REFRESH_KEY, {
      algorithm: process.env.JWT_ALGO,
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
