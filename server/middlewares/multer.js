import multer from 'multer';

const storage = multer.memoryStorage();
const singleUpload = multer({ storage }).single('profile_img'); // Ensure the field name is 'profile_img'

export default singleUpload;
