const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categories_model = new Schema({
  type: { type: String, default: "Investment" },
  color: { type: String, default: "yellow" },
  userID: { type: String },
});

const transaction_model = new Schema({
  name: { type: String, default: "Anonymous" },
  type: { type: String, default: "Investment" },
  amount: { type: Number },
  date: { type: Date, default: Date.now },
  isRefundable: { type: Boolean, default: false },
  userID: { type: String },
});

const Categories = mongoose.model("categories", categories_model);
const Transaction = mongoose.model("transaction", transaction_model);

module.exports = {
  Categories,
  Transaction,
};
