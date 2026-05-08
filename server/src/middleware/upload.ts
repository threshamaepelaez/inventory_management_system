import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadPath = 'uploads/';

if (!fs.existsSync(uploadPath)) {

  fs.mkdirSync(uploadPath, {
    recursive: true
  });

}

const storage = multer.diskStorage({

  destination: (_req, _file, cb) => {

    cb(null, uploadPath);

  },

  filename: (_req, file, cb) => {

    const uniqueName =
      'image-' +
      Date.now() +
      '-' +
      Math.round(Math.random() * 1E9) +
      path.extname(file.originalname);

    cb(null, uniqueName);

  }

});

const upload = multer({
  storage
});

export default upload;