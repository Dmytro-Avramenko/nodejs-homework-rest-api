const { Сontact } = require('../../models/contact');

const { HttpError, ctrlWrapper } = require("../../helpers");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const {page = 1, limit = 20} = req.query;
  const skip = (page - 1) * limit;
  const result = await Сontact.find({owner}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "name email subscription");
  res.json(result);  
}

const add = async (req, res, next) => {
  const {_id: owner} = req.user;
  const result = await Сontact.create({...req.body, owner});
  res.status(201).json(result);  
}

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Сontact.findOne({ _id: contactId });
  if (!result) {
    throw HttpError(404, 'Not found by id');
  }
  res.json(result)  
}

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Сontact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!result) {
    throw HttpError(404, 'Not found by id');
  }
  res.json(result);  
}

const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Сontact.findByIdAndUpdate(contactId, req.body, {new: true});
  if (!result) {
    throw HttpError(404, 'message ":" Not found');
  }
  res.json(result);  
}

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Сontact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, 'Not found by id');
  }
  res.json({
    message: "Сontact deleted"
  })   
}

module.exports = {
  getAll: ctrlWrapper(getAll),
  add: ctrlWrapper(add),
  getById: ctrlWrapper(getById),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteById: ctrlWrapper(deleteById),
}

