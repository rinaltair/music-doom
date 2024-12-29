const { Storage } = require('megajs');
const Logger = require('../config/logger');
const catchAsync = require('../utils/catchAsync');
const config = require('../config/config');

let result;

const mega = new Storage({
  email: config.mega.email,
  password: config.mega.password,
});

const megaInit = async () => {
  try {
    // Log success when storage is ready
    mega.once('ready', () => {
      Logger.info('Connected to Mega.nz');
    });

    // Log errors
    mega.once('error', (err) => {
      Logger.error('Error connecting to Mega.nz:', err);
    });

    // Wait until the storage is ready
    await mega.ready;
  } catch (error) {
    Logger.error('Failed to initialize Mega storage:', error);
  }
};

const uploadMusic = async (file) => {
  if (!mega.ready) {
    await megaInit();
  }
  const stream = mega.upload({ name: file.originalname, size: file.size }, file.buffer);
  stream.once('progress', (info) => Logger.info(`Uploaded ${info.bytesUploaded}, bytes of ${info.bytesTotal}`));
  stream.once('complete', () => {
    result = 'File uploaded successfully';
    Logger.info(result);
  });
  stream.once('error', (error) => Logger.error('There was an error:', error));
  await stream.complete;
  return result;
};

megaInit();
module.exports = {
  mega,
  uploadMusic,
};
