const { google } = require('googleapis');
const drive = google.drive('v3');

/**
 * Retriving files from google drive with pagination and optional fillter.
 */
const getFiles = () => {
  return drive.files.list({
      fields: "nextPageToken, files(id, name, mimeType,iconLink)"
  });
}

/**
 * Retrive specific file from google drive by the file id.
 * 
 * @param {string} fileID The id of the wanted file from google drive.
 */
const getFileById = (fileID) => {
  return drive.files.get({
    fileId: fileID,
    fields: "id, name, mimeType,iconLink"
  })
}

/**
 * Searching file in google drive by his name.
 * 
 * @param {string} searchQuery The name of the wanted file.
 */
const searchFile = (searchQuery) => {
  return drive.files.list({
    q: searchQuery,
    fields: 'files(kind, id, name, mimeType,iconLink)',
  });
}

/**
 * Adding tag to file for future searching/categorized and etc..
 * 
 * @param {sting} tagName The value of the tag to add.
 * @param {fileId} fileId The id of the file you want to add tag to him.
 */
const addTag = (tagName, fileId) => {
  const fileMetadata = {
      'properties': { "tag": tagName }
  };

  return drive.files.update({
      fileId: fileID,
      resource: fileMetadata,
      fields: 'id'
  });
}


module.exports = {
  getFiles: getFiles,
  getFileById: getFileById,
  searchFile: searchFile,
  addTag: addTag
}