import type { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage: storage });

// Disable default body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

// Next.js API route handler
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Use Multer to parse the incoming request
  upload.single('file')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to upload file' });
    }

    // Check if the file exists
    const file = req.file;  // Correctly access the uploaded file here
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      const cloudinaryUrl = await uploadImageToCloudinary(file);
      return res.status(200).json({ secure_url: cloudinaryUrl });
    } catch (uploadError) {
      return res.status(500).json({ error: uploadError.message });
    }
  });
}

// Upload image to Cloudinary
async function uploadImageToCloudinary(file: Express.Multer.File): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
      if (error) {
        reject(new Error('Failed to upload image to Cloudinary'));
      } else {
        resolve(result?.secure_url || '');
      }
    });

    // Use the buffer from memory storage
    uploadStream.end(file.buffer);
  });
}

// const response = await fetch(
//   `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT}/images/v2/direct_upload`,
//   {
//     method: 'POST',
//     headers: { Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}` },
//   }
// )

// const data = await response.json()

// res.status(200).json(data.result)

