import express from 'express';
import multer from 'multer';
import path from 'path';
import pkg from 'cloudinary';
import asyncHandler from 'express-async-handler';

const router = express.Router();
const cloudinary = pkg;

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }
  return cb('Images Only');
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post(
  '/',
  upload.single('image'),
  asyncHandler(async (req, res) => {
    console.log(`Hello ${req.file.path}`);
    const uploadPhoto = await cloudinary.uploader.upload(`${req.file.path}`);
    console.log(uploadPhoto); // This will give you all the information back from the uploaded photo result
    console.log(uploadPhoto.url); // This is what we want to send back now in the  res.send
    res.send(uploadPhoto.url);
  })
);

// router.post('/', upload.single('image'), (req, res) => {
//   res.send(`/${req.file.path}`);
// });
export default router;
