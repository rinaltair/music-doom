const crud = (model) => ({
  async create(data) {
    const object = new model(data);
    await object.save();
    return object;
  },

  async updateById(id, data) {
    const object = await model.findOneAndUpdate({ _id: id }, data, { new: true });
    return object;
  },

  async getById(id) {
    const object = await model.findById(id);
    return object;
  },
});

module.exports = crud;
