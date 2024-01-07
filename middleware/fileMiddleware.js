const fs = require('fs');

// 파일 삭제
const deleteFile = (path) => {
    fs.unlink(path, (err) => {
        if (err) {
            console.error(`Error deleting file: ${err}`);
            return;
        }
        console.log('File deleted successfully');
    })
}

module.exports = deleteFile