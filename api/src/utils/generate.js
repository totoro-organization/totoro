const QRCode = require("qrcode");
const crypto = require('crypto');
var onlyPath = process.cwd();

module.exports = {
    qrcode: async function (path, text) {
        const opts = {
            errorCorrectionLevel: 'H',
            type: 'terminal',
            quality: 0.95,
            margin: 1,
            color: {
              dark: '#208698',
              light: '#FFF',
            },
        }
        const filename = "jobs-"+Date.now()+".png";
        
        const File = await QRCode.toFile(onlyPath + "/data" +path+"/"+filename, text, opts);
        return path+"/"+filename;
    },
    randomValueHex: function(len){
        return crypto.randomBytes(Math.ceil(len/2))
            .toString('hex')
            .slice(0,len).toUpperCase();
    }
}
  