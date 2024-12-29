const { Storage } = require('megajs');
const Logger = require('../config/logger');
const config = require('../config/config');

let result;
let rootdir;
let musicdir;
let picdir;

const mega = new Storage({
  email: config.mega.email,
  password: config.mega.password,
});

const megaInit = async () => {
  try {
    // Log success when storage is ready
    mega.once('ready', () => Logger.info('Connected to Mega.nz'));
    // Log errors
    mega.once('error', (err) => Logger.error('Error connecting to Mega.nz:', err));

    // Wait until the storage is ready
    await mega.ready;

    // Setting directory for cloud storage
    rootdir = await directory(mega.root, config.mega.directory);
    musicdir = await directory(rootdir, 'music');
    picdir = await directory(rootdir, 'picture');
  } catch (error) {
    Logger.error('Failed to initialize Mega storage:', error);
  }
};

const directory = async (parent, folderName) => {
  // Search for the folder by name
  let chiild = parent.children.find((child) => child.name === folderName);

  if (chiild) {
    // Logger.info(`Folder "${folderName}" found.`);
  } else {
    // Create the folder if it doesn't exis
    chiild = await parent.mkdir(folderName);
    // Logger.info(`Folder "${folderName}" created.`);
  }
  return chiild;
};

const uploadFile = async (type, file) => {
  // TODO:
  //  1. arrange the directory
  //  2. return the directory to the controller

  if (!mega.ready) {
    await megaInit();
  }

  let stream;
  if (type === 'muisc') {
    stream = musicdir.upload({ name: file.originalname, size: file.size }, file.buffer);
  } else {
    stream = picdir.upload({ name: file.originalname, size: file.size }, file.buffer);
  }

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
  uploadFile,
};
