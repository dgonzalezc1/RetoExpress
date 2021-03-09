var express = require('express');
const { validate } = require('../lib/sequelize');
const Message = require('../models/message');
var router = express.Router();

const Joi = require("joi");


/* GET total. */
router.get('/', function(req, res, next) {
  Message.findAll().then((result) => {
    res.send(result);
  });
});

router.get('/:id', function(req, res, next) {
  Message.findByPk(req.params.id).then((result) => {
    if (result === null)
      return res.status(404).send("The message with given id was not found.")
    res.send(result);
  });
});

router.post("/", function(req,res, next){
  const { error } = validateMessage(req.body);

  if (error) return res.status(404).send(error.details[0].message);
  const { message, author} = req.body;

  Message.create({message, author}).then((result) => {
    console.log("Response", result);
    res.send(result);
  });
});

router.put("/:id", function(req,res, next){
  const { error } = validateMessage(req.body);

  Message.update(req.body, {where: { id: req.params.id}}).then((result) => {
    console.log("Response updated", result);
    if(result[0] === 0)
      return res.status(404).send("The messages with given id was not found");
    res.status(200).send("Message updated");
  });
});

router.delete("/:id", function(req,res, next){
  //let message = messages.find((message) => message.id === parseInt(req.params.id));
  //if(!message) return res.status(404).send("Not Found");

  Message.destroy({where:{id: req.params.id}}).then(result=> {
    if (result === 0)
      return res.status(404).send("The message with given id was not found");
    res.status(204).send();
  });
  //const index = messages.indexOf(message);
  //messages.splice(index,c1);
  //res.send(message);
});

const validateMessage = (message) => {
  const schema = Joi.object({
    message: Joi.string().min(1).max(100).required(),
    author: Joi.string().min(2).max(30).required(),
  });

  return schema.validate(message);
};

module.exports = router;
