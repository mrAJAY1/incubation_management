const Model = require("../Model").User;
const bcrypt = require("bcrypt");
const {genAccess,genRefresh}= require("../authentication/token_generator");

module.exports = {
  signup: async (body) => {
    const exists = await Model.exists({ email: body.email });
    if (exists) {
     throw Error("user exists");
    }
    const data = new Model(body);

    try {
      const user = await data.save();

      const accessToken = await genAccess({
        id: user._id,
        email: user.email,
      });

      const refreshToken = await genRefresh({
        id: user._id,
        email: user.email,
        name: user.name,
      });

      return { accessToken:accessToken, refreshToken:refreshToken, role: user.role, id: user._id };
    } catch (err) {
      console.error(err);
      throw Error(err.message);
    }
  },
  login: async (body) => {
    const user = await Model.findOne({ email: body.email });
    if (!user) {
      throw Error("user not found");
    }
    const status = await bcrypt.compare(body.password, user.password);
    if (!status) {
      throw Error("credential Error");
    }
    console.log(user)
    const accessToken = await genAccess({
      id: '62c84fa3b59a62d552aaee3f',
      email: user.email,
    });
    const refreshToken = await genRefresh({
      id: user._id,
      email: user.email,
      name: user.name,
    });
    return { accessToken:accessToken, refreshToken:refreshToken, role: user.role, id: user._id };
  },
};
