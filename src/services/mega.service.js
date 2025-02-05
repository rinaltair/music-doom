const { Storage } = require('megajs');
const httpStatus = require('http-status');
const Logger = require('../config/logger');
const config = require('../config/config');
const ApiError = require('../utils/ApiError');

let rootDirectory;
let songDirectory;
let pictDirectory;

const megaStorage = new Storage({
  email: config.mega.email,
  password: config.mega.password,
});

const getDirectory = async (parentDirectory, folderName) => {
  // Search for the folder by name
  const existingDirectory = parentDirectory.children.find((child) => child.name === folderName);
  return existingDirectory || (await parentDirectory.mkdir(folderName));
};

const initializeMegaStorage = async () => {
  try {
    megaStorage.once('ready', () => Logger.info('Connected to Mega.nz'));
    await megaStorage.ready;

    // Setting directory for cloud storage
    rootDirectory = await getDirectory(megaStorage.root, config.mega.directory);
    songDirectory = await getDirectory(rootDirectory, 'song');
    pictDirectory = await getDirectory(rootDirectory, 'picture');
  } catch (error) {
    Logger.error('Failed to initialize Mega storage:', error);
  }
};

const uploadFile = async (fileType, file, filename) => {
  // Initialize the storage
  !megaStorage.ready ? await initializeMegaStorage() : null;

  // Choose storage directory
  try {
    const uploadStream =
      fileType === 'song'
        ? songDirectory.upload({ name: filename, size: file.size }, file.buffer)
        : pictDirectory.upload({ name: filename, size: file.size }, file.buffer);

    // Upload the file
    await uploadStream.complete;
  } catch (error) {
    Logger.error('There was an error:', error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'File upload failed');
  }
};

const downloadFile = async (fileType, uri) => {
  !megaStorage.ready ? await initializeMegaStorage() : null;

  const fileDirectory = fileType === 'song' ? songDirectory.find(uri) : pictDirectory.find(uri);
  if (!fileDirectory) {
    throw new ApiError('File not found');
  }
  const downloadStream = await fileDirectory.downloadBuffer();
  return downloadStream;
};

const deleteFile = async (fileType, uri) => {
  !megaStorage.ready ? await initializeMegaStorage() : null;

  const fileDirectory = fileType === 'song' ? songDirectory.find(uri) : pictDirectory.find(uri);
  if (!fileDirectory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'File not found');
  }
  await fileDirectory.delete().catch((error) => {
    Logger.error(error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'File delete failed');
  });
};

initializeMegaStorage();
module.exports = {
  megaStorage,
  uploadFile,
  downloadFile,
  deleteFile,
};
