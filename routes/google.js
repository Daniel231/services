const express = require("express")
const router = express.Router();
const googleDrive = require('../core/google/drive');

// Interacting to google drive and get files names with id`s
router.get("/drive/files", async function (req, res) {
  try {
    const files = await googleDrive.getFiles();
    res.send(files.data);
  } catch(error) {
    console.error(error);
  }
})
  

module.exports = router;