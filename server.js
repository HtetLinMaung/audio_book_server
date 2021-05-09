require("dotenv").config();

const cors = require("cors");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("./utils/storage-utils");

const uploadImage = require("./middlewares/upload-image");

const PORT = process.env.PORT || 3000;

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: "public-read",
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

const config = require("./graphql/index");
const server = new ApolloServer(config);

const app = express();
server.applyMiddleware({ app });

app.use(cors());
app.use(express.json());
app.use(upload.single("file"));
app.post("/upload-file", uploadImage);

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch(console.error);
