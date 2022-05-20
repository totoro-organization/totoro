var multer = require('multer');
var onlyPath = process.cwd();

module.exports = {
	storage:  function(path){
        return multer.diskStorage({
            destination: (req, file, cb) => {
              cb(null, onlyPath+'/data'+path)
            },
            filename: (req, file, cb) => {
              var fileFormat = (file.originalname).split(".");
              var preffix= path.substring(1);
              cb(null, preffix+'-'+Date.now() + '.' + fileFormat[fileFormat.length - 1])            }
        })
    },
    upload : function(path) {
        return multer({storage: module.exports.storage(path), limits: { fileSize: 2 * 1024 * 1024 }})
    }
};
