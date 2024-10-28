// import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

type UploadFileResponse = {
  error?: string
  imageURL?: string
  blurpfp?: string
}

export async function uploadFile(file: File, isPfp?: boolean): Promise<UploadFileResponse> {
  const formData = new FormData()

  formData.append('file', file)
  // Get the Cloudinary upload URL
  const response = await fetch('/api/images/getuploadurl', {
    method: 'POST',
    body: formData,
  });

  // console.log(response.json())
  const { secure_url: cloudinaryUrl } = await response.json();
  
  if (!isPfp) return { imageURL: cloudinaryUrl }

  // const createblurpfp = await fetch('/api/images/createblurpfp', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ imageurl: cloudinaryUrl }),
  // })

  // const { blurpfp } = await createblurpfp.json()

  return { imageURL: cloudinaryUrl, blurpfp: "blurpfp" }
}
