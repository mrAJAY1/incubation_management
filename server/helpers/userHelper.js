const Model = require("../Model").User;
const bcrypt = require("bcrypt");
const { default: mongoose, model } = require("mongoose");
const { genAccess, genRefresh } = require("../authentication/token_generator");
const { Slot } = require("../Model");
const ObjectId = mongoose.Types.ObjectId;
module.exports = {
  signup: async (body) => {
    const exists = await Model.exists({ email: body.email });
    if (exists) {
      throw Error("email is already in use");
    }
    const data = new Model(body);
    try {
      const user = await data.save();

      const accessToken = await genAccess({
        id: user._id,
        email: user.email,
        role: user.role,
      });

      const refreshToken = await genRefresh({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      });
      return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: {
          role: user.role,
          id: user._id,
          emai: user.email,
          name: user.name,
        },
      };
    } catch (err) {
      console.error(err);
      throw Error(err.message);
    }
  },
  login: async (body) => {
    const user = await Model.findOne({ email: body.email }).lean();
    if (!user) {
      throw Error("user not found");
    }
    const status = await bcrypt.compare(body.password, user.password);
    if (!status) {
      throw Error("invalid email or password");
    }

    const accessToken = await genAccess({
      id: user._id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = await genRefresh({
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: {
        role: user.role,
        id: user._id,
        email: user.email,
        name: user.name,
      },
    };
  },

  submitForm: async (id, body) => {
    const data = await Model.findOne({ _id: id }).lean();
    if (!data) {
      throw new Error("invalid attempt");
    }
    if (data.status === "pending" || data.status === "approved") {
      throw Error("duplicate submition");
    }
    try {
      const result = await Model.findOneAndUpdate(
        { _id: id },
        { status: "pending", application: body.application }
      );
    } catch (err) {
      throw Error(err.message);
    }
  },

  getHome: async (id) => {
    console.log(id);
    const user = await Model.aggregate([
      {
        $match: {
          _id: ObjectId(id),
        },
      },
      {
        $project: {
          status: "$status",
          name: "$name",
          email: "$email",
          role: "$role",
        },
      },
    ]);
    if (!user) {
      throw Error("invalid attempt");
    }

    return user[0];
  },
  getDashBoard: async () => {
    try {
      const data = await Model.aggregate([
        {
          $match: { status: "pending", role: "user" },
        },
        {
          $project: {
            password: 0,
          },
        },
      ]).sort({ createdAt: -1 });
      return data;
    } catch (err) {
      throw Error(err.message);
    }
  },
  getAllApp: async () => {
    try {
      const data = await Model.find({
        role: "user",
        $or: [
          { status: "pending" },
          { status: "approved" },
          { status: "rejected" },
          { status: "booked" },
        ],
      }).sort({ createdAt: -1 });
      console.log(data);
      return data;
    } catch (err) {
      throw Error(err.message);
    }
  },
  rejectApp: async (id) => {
    try {
      const result = await Model.updateOne(
        { _id: id },
        { $set: { status: "rejected" } }
      );
    } catch (err) {
      throw Error(err.message);
    }
  },
  approveApp: async (id) => {
    try {
      const result = await Model.updateOne(
        { _id: id },
        { $set: { status: "approved" } }
      );
    } catch (err) {
      throw Error(err.message);
    }
  },
  getAllSlots: async (id) => {
    try {
      const result = await Slot.find({});
      return result;
    } catch (err) {
      throw Error(err.message);
    }
  },
  bookSlots: async (body) => {
    try {
      const data = await Model.updateOne(
        { _id: body._id },
        {
          $set: {
            userId: body.uId,
            isBooked: true,
          },
        }
      );
    } catch (err) {
      throw Error(err.message);
    }
  },
  removeBooking: async (body) => {
    try {
      await Model.updateOne(
        { _id: body._id },
        { $set: { userId: "", isBooked: false } }
      );
    } catch (err) {
      throw Error(err.message);
    }
  },
};
