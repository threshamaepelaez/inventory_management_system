import multer from 'multer';
import path from 'path';
import fs from 'fs';

/* =========================
   CREATE UPLOADS FOLDER
========================= */

const uploadPath = path.join(__dirname, '../../uploads');

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, {
    recursive: true
  });
}

/* =========================
   STORAGE
========================= */

const storage = multer.diskStorage({

  destination: (
    req,
    file,
    cb
  ) => {

    cb(null, uploadPath);

  },

  filename: (
    req,
    file,
    cb
  ) => {

    const uniqueSuffix =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1E9);

    const extension =
      path.extname(file.originalname);

    const fileName =
      file.fieldname +
      '-' +
      uniqueSuffix +
      extension;

    cb(null, fileName);

  }

});

/* =========================
   FILE FILTER
========================= */

const fileFilter = (
  req: any,
  file: any,
  cb: any
) => {

  const allowedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp'
  ];

  if (
    allowedTypes.includes(file.mimetype)
  ) {

    cb(null, true);

  } else {

    cb(
      new Error(
        'Only JPG, JPEG, PNG, and WEBP images are allowed'
      ),
      false
    );

  }

};

/* =========================
   MULTER CONFIG
========================= */

const upload = multer({

  storage,

  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024
  }

});

/* =========================
   EXPORT
========================= */

export default upload;