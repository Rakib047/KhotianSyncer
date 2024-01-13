const {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
  } = require("@aws-sdk/client-s3");
  const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
  const TermFinalModel = require("../models/TermFinalModel");
  
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
  
  const handleTermFinalUpload = async (req, res) => {
    //   console.log(req.file);
    //   res.json({ message: "working" });
  
    const termFinalFileName = req.file.originalname;
    const params = {
      Bucket: bucketName,
      Key: termFinalFileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };
    const command = new PutObjectCommand(params);
    await s3.send(command);
  
    // Extract information from the request body
    const { courseTitle, batch } = req.body;
    const user_id=req.userProperty._id
  
    // Save information to MongoDB
    const newTermFinal = new TermFinalModel({
      courseTitle,
      user_id,
      batch,
      termFinalFileName,
    });
  
    // Save the document to MongoDB
    await newTermFinal.save();
  
    res.json(newTermFinal);
  };
  
  const getAllTermFinal = async (req, res) => {
    const user_id=req.userProperty._id
    const allTermFinal = await TermFinalModel.find({user_id});
  
    // Loop over each termfinal
    for (const termfinal of allTermFinal) {
      const getObjectParams = {
        Bucket: bucketName,
        Key: termfinal.termFinalFileName,
      };
  
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      termfinal.termFinalUrl = url;
  
      // Add more actions as needed
    }
  
    res.json({ allTermFinal });
  };
  
  const deleteTermFinal = async (req, res) => {
    const { termFinalId } = req.params;
    const user_id=req.userProperty._id
    const termFinalToDelete = await TermFinalModel.findOne({ _id: termFinalId ,user_id});
  
    if(!termFinalToDelete){
      res.status(404).json({message:"termfinal file not found"})
      return 
    }
  
    //Delete the slide from S3
  
    // const params = {
    //   Bucket: bucketName,
    //   Key: slideToDelete.termFinalFileName,
    // };
    // console.log(params.Key)
    // const command = new DeleteObjectCommand(params)
    // await s3.send(command)
  
    //Delete the slide from MongoDB
    await TermFinalModel.findByIdAndDelete({ _id: termFinalId });
  
    res.status(200).json({message:"term final deleted hogaye"})
  };
  
  module.exports = {
    handleTermFinalUpload,
    getAllTermFinal,
    deleteTermFinal,
  };
  