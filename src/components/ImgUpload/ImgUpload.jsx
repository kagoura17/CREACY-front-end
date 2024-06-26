// import logo from "../../assets/logo.png";
import { useState } from "react";
import axios from "axios";
import "./ImgUpload.css";
const ImgUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const API = import.meta.env.VITE_API;
  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setUploadStatus("No file selected.");
      return;
    }

    // Create a FormData object and append the file
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      // Send the FormData to the server using Axios
      const response = await axios.post(`${API}/products/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // responses status
      if (response.status === 200) {
        setUploadStatus("Image uploaded successfully!");
      } else {
        setUploadStatus("Failed to upload the image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadStatus("Failed to upload the image.");
    }
  };
  return (
    <>
      <div className="imageUpload">
        <form onSubmit={handleSubmit}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button type="submit">Upload Image</button>
        </form>
        <p>{uploadStatus}</p>
      </div>
    </>
  );
};

export default ImgUpload;
