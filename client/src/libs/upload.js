import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "fiverr"); // Ensure this preset exists on Cloudinary

  try {
    // Upload to Cloudinary's raw upload endpoint
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dksanjzg0/raw/upload",
      data
    );
    let { url } = res.data; // Get the file's URL

    // Ensure the URL uses HTTPS
    if (url.startsWith("http://")) {
      url = url.replace("http://", "https://");
    }

    return url;
  } catch (error) {
    console.error("Upload error: ", error);
  }
};

export default upload;
