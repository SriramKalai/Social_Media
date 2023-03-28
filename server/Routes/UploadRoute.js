import express from 'express'
const router = express.Router()
import multer from 'multer'
import S3Client from '@aws-sdk/client-s3'

//aws 
async function uploadt0S3(path,originalFilename,mimemtype){
    const client=new S3Client({
        region:"Asia Pacific (Mumbai) ap-south-1",
        credentials:{
            accessKey:process.env.S3_ACCESS_KEY,
            secretAccessKey:process.env.S3_SECRET_ACCESS_KEY,
        }
    });
    console.log({path,originalFilename,mimemtype});
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
const upload = multer({ storage: storage });


router.post("/", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });

//   //aws setup
 const store = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
const up = multer({ storage: storage });



router.post("/",up.single("file"),async (req, res) => {
  const uploaded=[]
  const{path,originalFilename,mimemtype}=req.files;
  await uploadt0S3(path,originalFilename,mimemtype);
  try {
    return res.status(200).json("File uploded in aws successfully");
  } catch (error) {
    console.error(error);
  }
});




export default router