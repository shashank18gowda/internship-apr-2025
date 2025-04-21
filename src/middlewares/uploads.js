import multer from "multer";
const storage = () =>
  multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now();
      let ext = file.originalname.substring(
        file.originalname.lastIndexOf("."),
        file.originalname.length
      );
      cb(null, uniqueSuffix + ext);
    },
  });

const fileFilter = (req, file, cb) => {
  if (
    !file.mimetype.includes("image/jpg") &&
    !file.mimetype.includes("image/jpeg") &&
    !file.mimetype.includes("image/png")
  ) {
    cb(null, false);
    return cb(new Error("Only JPEG,PNG,JPG files are allowed!"));
  }

  cb(null, true);
};

const maxSize = 1024 * 1024 * 2;

const image = multer({
  storage: storage(),
  fileFilter: fileFilter,
  limits: { fileSize: maxSize },
});
export default image;
