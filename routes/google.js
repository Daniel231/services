const express = require("express")
const router = express.Router();
const googleDrive = require('../core/google/drive');

/**
 * Interacting to google drive and get files names with id`s
 */
router.get("/drive/files", async function (req, res) {
  try {
    const files = await googleDrive.getFiles();
    res.send(files.data);
  } catch(error) {
    res.status(400).send(error.message);
  }
})

router
  .route('/drive/files/:fileId')
    .get(async (req,res) => {
      try {
        const file = await googleDrive.getFileById(req.params.fileId);
        res.send(file.data);
      } catch(error) {
        res.status(400).send(error.message);
      }
    })
    .patch(async (req,res) => {
      try {
        const { tag } = req.body;
        const file = await googleDrive.addTag(tag, req.paramsfiledID);
        res.send(file.data);
      } catch(error) {
        res.status(400).send(error.message);
      }
    })

router.get('/drive/files', async (req,res) => {
  try {
    const {searchQuery} = req.body;
    const file = await googleDrive.searchFile(searchQuery);
    res.send(file.data);
  } catch(error) {
    res.status(400).send(error.message);
  }
})
  

module.exports = router;