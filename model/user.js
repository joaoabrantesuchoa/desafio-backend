const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  CPF: { type: String, required: true, unique: true, lowercase: true },
  nome: { type: String, required: true, lowercase: true },
  endereco: { type: String, required: true, lowercase: true },
  telefone: { type: String, required: true, lowercase: true },
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
