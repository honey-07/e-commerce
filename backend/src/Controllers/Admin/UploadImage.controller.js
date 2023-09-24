const { upload } = require("../../utils/Cloudnary");

const UploadImage = async (req, res) => { 
    const { file } = req;
    if(!file) {
        return res.status(400).json({ message: 'Please upload a file' });
    }
    const resp = await upload(file.path,file.originalname);
    res.json({ message: 'Image uploaded successfully', url: resp?.secure_url });
}

module.exports = UploadImage;