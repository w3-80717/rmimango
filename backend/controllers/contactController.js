const xss = require('xss');
const Contact = require('../models/Contact');
/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
exports.createContactMessage = async (req, res, next) => {
  try {
    let { fullName, email, state, city, message, phone, pincode } = req.body;
    let messageFiltered = xss.filterXSS(message, { stripIgnoreTag: true, stripIgnoreTagBody: true });
    if (message && typeof message === 'string' && message.length !== messageFiltered.length) {
      console.warn("Security Warning: Harmful String detected from the requestor: ", req.ip);
    }
    let newMessage = await Contact.create({ fullName, city, state, email, message: messageFiltered, phone, pincode });
    console.log("Created: ", newMessage);
    res.status(200).json({ message: "Thank you for contacting us! We will get back to you soon 😊" });
  } catch (error) {
    console.log(error);
    if (error.errors) {
      return res.status(500).json({ message: error.errors.map(error => error.message).join("\n") });
    }
    res.status(500).json({ message: error.message });
  }
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
exports.getAllMessages = async (req, res, next) => {
  try {
    res.status(200).json(await Contact.findAll());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}
/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
exports.deleteMessage = async (req, res, next) => {
  try {
    let id = req.params.id;
    if (await Contact.destroy({ where: { id } }) < 1) {
      return res.status(404).json({ message: "Cannot find message with id" + id });
    }
    return res.status(200).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}