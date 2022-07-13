const userHelper = require("../helpers/userHelper");

module.exports = {
  getAllSlots: async (req, res) => {
    try {
      const response = await userHelper.getAllSlots();
      res.status(200).json({ status: "success", response });
    } catch (err) {
      res.status(500).json({ status: "failed", message: err.message });
    }
  },
  verify: (req, res) => {
    res.status(200).json({status:'success',message:'verified'})
  },
  getDashBoard: async (req, res) => {
    try {
      const response = await userHelper.getDashBoard();
      res.status(200).json({ status: "success", response });
    } catch (err) {
      res.status(500).json({ status: "failed", message: err.message });
    }
  },
  recordList: async (req, res) => {
    try {
      const response = await userHelper.getAllApp();
      res.status(200).json({ status: "success", response });
    } catch (err) {
      res.status(500).json({ status: "failed", message: err.message });
    }
  },
  bookSlots: async (req, res) => {
    const body = req.body;
    try {
      const response = await userHelper.bookSlots(body);
      res.status(200).json({ status: "success", response });
    } catch (err) {
      res.status(500).json({ status: "failed", message: err.message });
    }
  },
  logout: (req, res) => {
    const { id } = req.decoded;
    redis.del(id);
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ status: "success" });
  },
  rejectApp: async (req, res) => {
    try {
      const { id } = req.body;
      await userHelper.rejectApp(id);
      res.status(200).json({ status: "success", message: "success" });
    } catch (err) {
      res.status(500).json({ status: "failed", message: err.message });
    }
  },
  approveApp: async (req, res) => {
    try {
      const { id } = req.body;
      await userHelper.approveApp(id);
      res.status(200).json({ status: "success", message: "success" });
    } catch (err) {
      res.status(500).json({ status: "failed", message: err.message });
    }
  },
  bookSlot: async (req, res) => {
    const body = req.body;
    if (!body) {
      res.status(404).json({ status: "failed", message: "body not found" });
    }
    try {
      await userHelper.bookSlots(body);
      res.status(200).json({ status: "success", message: "success" });
    } catch (err) {
      res.status(500).json({ status: "failed", message: err.message });
    }
  },
  removeSlot: async (req, res) => {
    const body = req.body;
    if (!body) {
      res.status(404).json({ status: "failed", message: "body not found" });
    }
    try {
      const response = await userHelper.removeBooking(body._id);
      res.status(200).json({ status: "success", message: "success" });
    } catch (err) {
      res.status(500).json({ status: "failed", message: err.message });
    }
  },
};
