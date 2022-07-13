const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      minlength: 5,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
   
    role: {
      type: String,
      default: "user",
    },
    status: {
      type: String,
      default: "nil",
    },
    application: {
      local: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },

      company: {
        type: String,
      },
      teamAndBackground: {
        type: String,
      },
      phone: {
        type: Number,
        required: true,
        minlength: 9,
        maxlength: 10,
      },
      companyAndProducts: {
        type: String,
      },
      problem: {
        type: String,
      },
      solution: {
        type: String,
      },
      proposition: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("INCUBATION_MANAGEMENT", userSchema);

const slotSchema = new mongoose.Schema({
  section: {
    type: String,
  },
  slot: {
    type: Number,
  },
  userId: {
    type: String,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
});

const Slot =  mongoose.model('Slots',slotSchema)

module.exports = { User ,Slot};
