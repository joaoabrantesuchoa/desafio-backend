const Users = require("../model/user");
const config = require("../config/config");
const jwt = require("jsonwebtoken");

const createUserToken = (CPF) => {
  return jwt.sign({ id: CPF }, config.jwt_pass, {
    expiresIn: config.jwt_expires_in,
  });
};

exports.getAll = async (req, res) => {
  try {
    const users = await Users.find({});
    return res.send(users);
  } catch (err) {
    return res.status(500).send({ error: "Erro na consulta de usuários!" });
  }
};

exports.getUser = async (req, res) => {
  const { CPF } = req.body;
  if (!CPF) return res.status(400).send({ error: "Dados insuficientes " });

  try {
    const user = await Users.findOne({ CPF });
    if (user === null) {
      return res.status(404).send({ error: "Usuário não cadastrado"});
    }
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ error: "Erro ao buscar usuário!" });
  }
};

exports.create = async (req, res) => {
  const { CPF, nome, endereco, telefone } = req.body;
  if (!CPF || !nome || !endereco || !telefone)
    return res.status(400).send({ error: "Dados insuficientes!" });

  try {
    if (await Users.findOne({ CPF }))
      return res.status(400).send({ error: "Usuário já registrado!" });

    const user = await Users.create(req.body);
    //user.password = undefined;

    return res.status(201).send({ user, token: createUserToken(user.id) });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Erro ao buscar usuário!" });
  }
};

exports.update = async (req, res) => {
  const { CPF, endereco, telefone } = req.body;

  if (!CPF || !endereco || !telefone)
    return res.status(400).send({ error: "Dados insuficientes!" });

  try {
    const user = await Users.findOne({ CPF });
    if (user === null) return res.status(404).send({ error: "Usuário não registrado" });

    user.telefone = telefone;
    user.endereco = endereco;
    user.save();

    return res.status(202).send({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Erro ao buscar usuário!" });
  }
};

exports.delete = async (req, res) => {
  const { CPF } = req.body;

  if (!CPF) return res.status(400).send({ error: "Dados insuficientes" });

  try {
    const user = await Users.findOne({ CPF });
    if (user === null) return res.status(404).send({ error: "Usuário não registrado" });

    if (await Users.deleteOne({ CPF })) {
      return res.status(200).send("Usuário deletado");
    }
  } catch (err) {
    return res.status(404).send({ error: "Usuário não registrado" });
  }
};
