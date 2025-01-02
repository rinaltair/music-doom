const { Storage } = require('megajs');
const Logger = require('../config/logger');
const config = require('../config/config');

let result;
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
  !megaStorage.ready ? await initializeMegaStorage() : null;

  const uploadStream =
    fileType === 'song'
      ? songDirectory.upload({ name: filename, size: file.size }, file.buffer)
      : pictDirectory.upload({ name: filename, size: file.size }, file.buffer);

  uploadStream.once('progress', (info) => {
    Logger.info(`Uploaded ${info.bytesUploaded}, bytes of ${info.bytesTotal}`);
  });
  uploadStream.once('complete', () => {
    result = 'File uploaded successfully';
    Logger.info(result);
  });
  uploadStream.once('error', (error) => {
    Logger.error('There was an error:', error);
  });

  await uploadStream.complete;
  return result;
};

const downloadFile = async (fileType, uri) => {
  !megaStorage.ready ? await initializeMegaStorage() : null;

  const fileDirectory = fileType === 'song' ? songDirectory.find(uri) : pictDirectory.find(uri);
  if (!fileDirectory) {
    throw new Error('File not found');
  }
  const downloadStream = await fileDirectory.downloadBuffer();
  return downloadStream;
};

initializeMegaStorage();
module.exports = {
  megaStorage,
  uploadFile,
  downloadFile,
};
