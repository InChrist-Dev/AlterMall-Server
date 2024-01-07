const fs = require('fs');

const checkDirectory = () => {
    try {
        fs.readdirSync('./upload');
    } catch (error){
        console.error('upload folder not found, generate one');
        fs.mkdirSync('./upload')
    }

    try {
        fs.readdirSync('./upload/itemImgs');
    } catch (error){
        console.error('upload/itemImgs folder not found, generate one');
        fs.mkdirSync('./upload/itemImgs')
    }

    try {
        fs.readdirSync('./upload/profiles');
    } catch (error){
        console.error('upload/profiles folder not found, generate one');
        fs.mkdirSync('./upload/profiles')
    }
}

module.exports = checkDirectory