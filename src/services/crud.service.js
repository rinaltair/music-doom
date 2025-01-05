const crud = (model) => ({
  async create(data) {
    const object = new model(data);
    await object.save();
    return object;
  },
  async getAll(data) {
    return await model.find(data);
  },
});

module.exports = crud;
