const httpStatus = require('http-status');
const random = require('../utils/random');
const megaService = require('./mega.service');
const ApiError = require('../utils/ApiError');

const crud = (model) => ({
  async create(data) {
    const object = new model(data);
    await object.save();
    return object;
  },

  /**
   * Create an object with a new photo
   * @param {Object} data - The data to create the object with
   * @param {Object} file - The photo file to upload
   * @param {string} propertyFile - The property name for the photo URL
   * @returns {Promise<Object>} - The created object
   * @throws {ApiError} - If the object cannot be created or the photo cannot be uploaded
   */
  async createwithPhoto(data, file, propertyFile) {
    // Upload the photo with random filename
    const filename = random.randomFilename(file);
    await megaService.uploadFile('picture', file, filename);

    try {
      // Create and save the object
      let object = new model({ ...data, [propertyFile]: filename });
      object = await object.save();

      return object;
    } catch (error) {
      await megaService.deleteFile('picture', filename);
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Failed to create ${model.modelName}`);
    }
  },

  /**
   * Update an object by id
   * @param {ObjectId} id - The id of the object to update
   * @param {Object} data - The data to update the object with
   * @returns {Promise<Object>} - The updated object
   * @throws {ApiError} - If the object cannot be found or updated
   */
  async updateById(id, data) {
    // Get the object by Id
    const object = await model.findById(id).catch((error) => {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Unable to find ${model.modelName}`);
    });

    // If the object is not found, throw an error
    if (!object) {
      throw new ApiError(httpStatus.NOT_FOUND, `${model.modelName} not found`);
    }

    // Update the object
    Object.assign(object, data);
    await object.save();

    return object;
  },

  /**
   * Update an object by id with a new photo
   * @param {ObjectId} id - The id of the object to update
   * @param {Object} updateBody - The data to update the object with
   * @param {Object} file - The photo file to upload
   * @param {string} photoProperty - The property name for the photo URL
   * @returns {Promise<Object>} - The updated object
   * @throws {ApiError} - If the object cannot be found or updated
   */
  async updateByIdWithPhoto(id, updateBody, file, photoProperty) {
    const object = this.updateById(id, updateBody);

    if (file) {
      try {
        const newPhotoName = random.randomFilename(file);
        await megaService.uploadFile('picture', file, newPhotoName);
        const updated = await model.findOneAndUpdate({ _id: id }, { [photoProperty]: newPhotoName });
        await megaService.deleteFile('picture', object[photoProperty]);
        return updated;
      } catch (error) {
        await megaService.deleteFile('picture', newPhotoName);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Failed to update ${model.modelName}`);
      }
    } else {
      return object;
    }
  },

  /**
   * Get an object by id
   * @param {ObjectId} id - The id of the object to get
   * @returns {Promise<Object>} - The object
   * @throws {ApiError} - If the object cannot be found
   */
  async getById(id) {
    const object = await model.findById(id);
    if (!object) {
      throw new ApiError(httpStatus.NOT_FOUND, `${model.modelName} not found`);
    }
    return object;
  },

  /**
   * Get all objects
   * @returns {Promise<Object[]>} - All objects
   */
  async getAll() {
    const objects = await model.find();
    return objects;
  },

  /**
   * Delete an object by id
   * @param {ObjectId} id - The id of the object to delete
   * @returns {Promise<Object>} - The deleted object
   * @throws {ApiError} - If the object cannot be found
   */
  async deleteById(id) {
    const object = await model.findByIdAndDelete(id);
    if (!object) {
      throw new ApiError(httpStatus.NOT_FOUND, `${model.modelName} not found`);
    }
    return object;
  },
});

module.exports = crud;
