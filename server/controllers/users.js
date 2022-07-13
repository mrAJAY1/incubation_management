const helper = require("../helpers/userHelper");
const {
  sendAccessCookie,
  sendRefreshCookie,
} = require("../authentication/token_generator");
const { default: Redis } = require("ioredis");
const userHelper = require("../helpers/userHelper");
const redis = new Redis();
module.exports = {
  getHome: async (req, res) => {
    try {
      const response = await userHelper.getHome(req.decoded.id);
      res.status(200).json({ message: "success", response });
    } catch (err) {
      if (err.message === "invalid attempt") {
        res.status(401).json({ message: err.message });
      }
    }
  },
  verify: (req, res) => {

    res.status(200).json({ status: "success", message: "verified" });
  },
  submitForm: async (req, res) => {
    const { body } = req;
    const sender = req.decoded.id;
    console.log(body)
    try {
      await userHelper.submitForm(sender, {
        
        application: {
          name: body.name,
          email: body.email,
          phone: body.phone,
          local: body.address,
          city: body.city,
          state: body.state,
          company: body.company,
          teamAndBackground: body.teamAndBackground,
          companyAndProducts: body.companyAndProducts,
          problem: body.problem,
          solution: body.solution,
          proposition: body.proposition,
        },
      });
      res.status(201).json({ status: "success", message: "success" });
    } catch (err) {
      switch (err.message) {
        case "invalid attempt":
          res.status(401).json({ status: "failed", message: err.message });
          break;
        case "duplicate submition":
          res.status(409).json({ status: "failed", message: err.message });
          break;
        default:
          res.status(500).json({ status: "failed", message: "internal error" });
      }
    }
  },
  logout: (req, res) => {
    const { id } = req.decoded;
    redis.del(id);
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ status: "success" });
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

      const { accessToken, refreshToken, user } = result;

      // Setting refresh token to redis
      const redisMaxAge =
        new Date().getTime() + parseInt(process.env.RT_COOKIE_LIFE);

      await redis.set(
        user.id,
        JSON.stringify({
          refreshToken: refreshToken,
          expires: redisMaxAge,
        })
      );
      sendAccessCookie(res, accessToken);
      sendRefreshCookie(res, refreshToken);

      res.status(200).json({ status: "success", response: user });
    } catch (err) {
      if (err.message === "email is already in use") {
        res.status(409).json({ status: "failed", message: err.message });
        return;
      }
      res.status(500).json({ status: "failed", message: err.message });
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
      const { accessToken, refreshToken, user } = result;

      // setting refresh token to redis
      const redisMaxAge =
        new Date().getTime() + parseInt(process.env.RT_COOKIE_LIFE);

      await redis.set(
        user.id,
        JSON.stringify({
          refreshToken: refreshToken,
          expires: redisMaxAge,
        })
      );
      sendAccessCookie(res, accessToken);
      sendRefreshCookie(res, refreshToken);

      res.status(200).json({ status: "success", response: user });
    } catch (err) {
      if (err.message === "user not found" || err.message ==="invalid email or password") {
        res.status(404).json({ status: "failed", message: err.message });
        return;
      }
      console.log(err);
      res.status(500).json({ status: "failed", message: err.message });
    }
  },
};
