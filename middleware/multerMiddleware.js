const multer = require('multer');
const path = require('path');
const fs = require('fs');

//상품 이미지 업로드
const uploadItem = (
    multer({
        storage: multer.diskStorage({
            destination(req, file, cb) {
                cb(null, './upload/itemImgs');
            },
            filename(req, file, cb) {
                const ext = path.extname(file.originalname);
                cb(null, Date.now() + ext);
            },
        }),
        limits: { fileSize: 5 * 1024 * 1024 },
    })
)

//사용자 이미지 업로드
const uploadProfile = (
    multer({
        storage: multer.diskStorage({
            destination(req, file, cb) {
                cb(null, './upload/profiles');
            },
            filename(req, file, cb) {
                const ext = path.extname(file.originalname);
                cb(null, Date.now() + ext);
            },
        }),
        limits: { fileSize: 5 * 1024 * 1024 },
    })
)

module.exports = {
    uploadItem,
    uploadProfile,
}