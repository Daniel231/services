const { google } = require('googleapis');
const drive = google.drive('v3');

require('dotenv').config()

// Getting all files from the google drive
const getFiles = () => {
    return drive.files.list({
        fields: "nextPageToken, files(id, name, mimeType,iconLink)"
      });
}

  module.exports = {
    getFiles: getFiles,
  }