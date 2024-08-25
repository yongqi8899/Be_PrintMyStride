import path from 'path'
import multer from 'multer'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    let extname = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + extname)
  }
})

const upload = multer({ storage: storage })

export default upload;