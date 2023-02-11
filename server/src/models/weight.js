const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const weightSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Number, required: true },
  weight: { type: Number, required: true },
});

module.exports = mongoose.model("Weight", weightSchema);
