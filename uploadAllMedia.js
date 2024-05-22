




import multer from 'multer';
import path from 'path';

// Setup multer to store uploaded files in 'tempPhotos' or 'tempVideos' based on file type
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const ext = path.extname(file.originalname).toLowerCase();
        if (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.gif') {
            cb(null, 'data/tempPhotos');
        } else if (ext === '.mp4' || ext === '.mov' || ext === '.avi') {
            cb(null, 'data/tempVideos');
        } else {
            // If the file type is not recognized, you can choose to throw an error or save it to a default directory
            cb(new Error('Unsupported file type'), null);
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Middleware to handle single file upload under the 'file' field name
export const uploadingMedia = upload.single('file');

