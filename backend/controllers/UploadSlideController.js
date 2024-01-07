const { crypto } = require("crypto");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const SlideModel = require("../models/SlideModel");

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

const handleSlideUpload = async (req, res) => {
//   console.log(req.file);
//   res.json({ message: "working" });

  const slideName = req.file.originalname;
  const params = {
    Bucket: bucketName,
    Key: slideName,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };
  const command = new PutObjectCommand(params);
  await s3.send(command);

  // Extract information from the request body
  const { courseTitle, semester } = req.body;

  // Save information to MongoDB
  const newSlide = new SlideModel({
    courseTitle,
    semester,
    slideName,
  });

  // Save the document to MongoDB
  await newSlide.save();

  res.json(newSlide);

};

module.exports = {
  handleSlideUpload,
};
