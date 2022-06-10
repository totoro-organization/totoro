const QRCode = require("qrcode");
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
}
  