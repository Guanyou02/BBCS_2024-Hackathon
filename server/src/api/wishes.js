import { upload, uploadImage, readAllwishes } from '../controller/wishesController';

// Multer middleware for file upload (image)
const multerUpload = upload.single('image');

// Main function to handle both POST and GET requests
export default function handler(req, res) {
  if (req.method === 'POST') {
    // Handle file upload and wish creation
    multerUpload(req, res, (err) => {
      if (err) {
        // Handle any multer errors (e.g., file too large)
        return res.status(400).json({ message: 'File upload error', error: err });
      }
      // After file is uploaded, call the controller's uploadImage function
      return uploadImage(req, res);
    });
  } else if (req.method === 'GET') {
    // Handle fetching all wishes
    return readAllwishes(req, res);
  } else {
    // Method Not Allowed
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
