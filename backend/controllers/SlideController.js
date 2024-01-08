const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
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

const getAllSlide = async (req, res) => {
  const allSlides = await SlideModel.find();

  // Loop over each slide
  for (const slide of allSlides) {
    const getObjectParams = {
      Bucket: bucketName,
      Key: slide.slideName,
    };

    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    slide.slideUrl = url;

    // Add more actions as needed
  }

  res.json({ allSlides });
};

const deleteSlide = async (req, res) => {
  const { slideId } = req.params;
  const slideToDelete = await SlideModel.findOne({ _id: slideId });

  if(!slideToDelete){
    res.status(404).json({message:"slide not found"})
    return 
  }

  //Delete the slide from S3

  // const params = {
  //   Bucket: bucketName,
  //   Key: slideToDelete.slideName,
  // };
  // console.log(params.Key)
  // const command = new DeleteObjectCommand(params)
  // await s3.send(command)

  //Delete the slide from MongoDB
  await SlideModel.findByIdAndDelete({ _id: slideId });

  res.status(200).json({message:"slide deleted hogaye"})
};

module.exports = {
  handleSlideUpload,
  getAllSlide,
  deleteSlide,
};
