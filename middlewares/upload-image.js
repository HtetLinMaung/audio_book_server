const s3 = require("../utils/storage-utils");

module.exports = async (req, res) => {
  try {
    if (!req.file) {
      const error = new Error("File not found!");
      throw error;
    }
    if (req.body.oldFileUrl) {
      clearFile(req.body.oldFileUrl, (err, data) => {
        if (err) {
          res.status(500).json({
            code: 500,
            message: "File upload failed!",
          });
        }
      });
    }
    res.json({
      fileUrl: req.file.location,
      code: 200,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      code: 500,
    });
  }
};

const clearFile = (path, cb) => {
  const pathArray = path.split("/");
  const Key = pathArray[pathArray.length - 1];
  s3.deleteObject(
    {
      Bucket: process.env.S3_BUCKET_NAME,
      Key,
    },
    cb
  );
};
