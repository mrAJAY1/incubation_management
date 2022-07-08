const helper = require("../helpers/userHelper");
const {
  sendAccessCookie,
  sendRefreshCookie,
} = require("../authentication/token_generator");
const { default: Redis } = require("ioredis");
const redis = new Redis();
module.exports = {
  getHome: async (req, res) => {
    res.send("hello");
  },
  signup: async (req, res) => {
    const data = req.body;
    try {
      const result = await helper.signup({
        email: data.email,
        phone: data.phone,
        name: data.name,
        password: data.password,
      });

      const { accessToken, refreshToken, id } = result;

      // Setting refresh token to redis
      const redisMaxAge =
        new Date().getTime() + parseInt(process.env.RT_COOKIE_LIFE);

      await redis.set(
        id,
        JSON.stringify({
          refreshToken: refreshToken,
          expires: redisMaxAge,
        })
      );
      sendAccessCookie(res, accessToken);
      sendRefreshCookie(res, refreshToken);

      res.status(200).json({ status: "ok" });
    } catch (err) {
      if (err.message === "user exists") {
        res.status(409).json({ status: "failed", cause: err.message });
        return;
      }
      res.status(500).json({ status: "failed", cause: err.message });
    }
  },

  // Login
  login: async (req, res) => {
    const data = req.body;
    try {
      const result = await helper.login({
        email: data.email,
        password: data.password,
      });
      const { accessToken, refreshToken, role, id } = result;

      // setting refresh token to redis
      const redisMaxAge =
        new Date().getTime() + parseInt(process.env.RT_COOKIE_LIFE);

      await redis.set(
        id,
        JSON.stringify({
          refreshToken: refreshToken,
          expires: redisMaxAge,
        })
      );

      await redis.get(id, (err, reply) => {
        console.log(reply);
      });
      sendAccessCookie(res, accessToken);
      sendRefreshCookie(res, refreshToken);

      res.status(200).json({ status: "ok", role });
    } catch (err) {
      if (err.message === "user not found") {
        res.status(404).json({ status: "failed", cause: err.message });
        return;
      }
      res.status(500).json({ status: "failed", cause: err.message });
    }
  },
};
