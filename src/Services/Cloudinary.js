const UploadImage = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "Play_Veda");
  data.append("cloud_name", "dl8doxs24");

  try {
    if (file === null) {
      console.log("No Image Selected");
    }
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dl8doxs24/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const cloudData = await res.json();
    console.log(cloudData.url);
    return cloudData.url;
  } catch (error) {
    console.log("error :" + error);
    return "No Image";
  }
};

export default UploadImage;
