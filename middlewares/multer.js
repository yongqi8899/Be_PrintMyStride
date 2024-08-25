// import multer from 'multer';
// const storage = multer.diskStorage({
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     }
// });
// const upload = multer({ dest: 'uploads/'})
// export default upload;

import path from 'path'
import multer from 'multer'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/uploads')
  },
  filename: function (req, file, cb) {
    let extname = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + extname)
  }
})

const upload = multer({ dest: 'uploads/'})

export default upload;