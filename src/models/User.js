const { Schema, model } = require("mongoose");

const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  ced: { type: String, required: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  user: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now }, //actual date
  birth: { type: String, required: true },
  prov: { type: String, required: true },
  city: { type: String, required: true },
  mst: { type: String, required: true },
  sst: { type: String, required: true },
  pr1: { type: String, required: true },
  r1: { type: String, required: true },
  pr2: { type: String, required: true },
  r2: { type: String, required: true },
  pr3: { type: String, required: true },
  r3: { type: String, required: true },
  token: { type: String, required: true },
});



UserSchema.methods.encryptPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = model("User", UserSchema);
