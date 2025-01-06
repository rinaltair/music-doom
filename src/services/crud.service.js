const random = require('../utils/random');
const megaService = require('./mega.service');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const crud = (model) => ({
  async create(data) {
    const object = new model(data);
    await object.save();
    return object;
  },

  async createwithPhoto(data, file, propertyFile) {
    const filename = random.randomFilename(file);
    await megaService.uploadFile('picture', file, filename);

    try {
      let object = new model({ ...data, [propertyFile]: filename });
      object = await object.save();
      return object;
    } catch (error) {
      await megaService.deleteFile('picture', filename);
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Failed to create ${model.modelName}`);
    }
  },

  async updateById(id, data) {
    const object = await model.findOneAndUpdate({ _id: id }, data, { new: true });
    return object;
  },

  async getById(id) {
    const object = await model.findById(id);
    return object;
  },

  async getAll() {
    const objects = await model.find();
    return objects;
  },

  async deleteById(id) {
    const object = await model.findByIdAndDelete(id);
    return object;
  },
});

module.exports = crud;
