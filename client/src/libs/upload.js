import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "fiverr"); // Ensure this preset exists on Cloudinary

  // Determine the resource type: "image" for images, "raw" for other file types
  const isImage = file.type.startsWith("image/");
  const endpoint = `https://api.cloudinary.com/v1_1/dksanjzg0/${isImage ? "image" : "raw"}/upload`;

  try {
    // Upload to the appropriate Cloudinary endpoint
    const res = await axios.post(endpoint, data);
    let { secure_url } = res.data; // Use the secure URL for HTTPS

    return secure_url; // Return the uploaded file's URL
  } catch (error) {
    console.error("Upload error: ", error);
    throw new Error("Failed to upload file. Please try again.");
  }
};

export default upload;
