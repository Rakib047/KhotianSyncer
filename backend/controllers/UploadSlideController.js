
const { S3Client,PutObjectCommand } = require("@aws-sdk/client-s3");

const bucketName = process.env.BUCKET_NAME
const bucketRegion =process.env.BUCKET_REGION
const accessKey=process.env.ACCESS_KEY
const secretAccessKey=process.env.SECRET_ACCESS_KEY

const s3= new S3Client({
    credentials :{ 
        accessKeyId:accessKey,
        secretAccessKey:secretAccessKey
    },
    region:bucketRegion
})

const handleSlideUpload = async (req,res)=>{
    console.log(req.file)
    res.json({message:"working"})
    const params = {
        Bucket: bucketName,
        Key: req.file.originalname,
        Body:req.file.buffer,
        ContentType:req.file.mimetype,
    }
    const command = new PutObjectCommand(params)
    await s3.send(command)
}

module.exports ={
    handleSlideUpload
}