const cloudinary = require('cloudinary').v2;

cloudinary.config({
    secure: true,
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const upload = async (path,filename) => {
    try { 

        return await cloudinary.uploader.upload(path, {
            folder: 'ecommerce',
            resource_type: 'raw',
            filename_override: filename,
        });
    }
    catch (err) {
        console.log(err);
    }
}

const destroy = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);

    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    upload,
    destroy,
}
