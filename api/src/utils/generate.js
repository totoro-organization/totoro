var QRCode = require("qrcode-svg");
const crypto = require('crypto');
const fs = require('fs');
var JsBarcode = require('jsbarcode');
const { DOMImplementation, XMLSerializer } = require('xmldom');

var onlyPath = process.cwd();

module.exports = {
    qrcode: async function (path, content) {
        const filename = "qrcode-"+Date.now()+".svg";
        const outfile = `${onlyPath}/data${path}/${filename}`;

        const qrcode = new QRCode({
            content,
            padding: 0,
            width: 256,
            height: 256,
            color: "#208698",
            background: "#ffffff",
            ecl: "Q"
        }).svg();

        console.log(qrcode);

        try {
            fs.writeFileSync(outfile, qrcode);
        } catch(err) {
            console.error(err);
        }

        return path+"/"+filename;
    },
    barcode: async function(path, data){
        const filename = "barcode-"+Date.now()+".svg";
        const outfile = `${onlyPath}/data${path}/${filename}`;

        const xmlSerializer = new XMLSerializer();
        const document = new DOMImplementation().createDocument('http://www.w3.org/1999/xhtml', 'html', null);
        const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

        JsBarcode(svgNode, data, {
            xmlDocument: document,
            format: "CODE39"
        });

        const svgText = xmlSerializer.serializeToString(svgNode);

        try {
            fs.writeFileSync(outfile, svgText);
        } catch(err) {
            console.error(err);
        }

        return path+"/"+filename;
    },
    randomValueHex: function(len){
        return crypto.randomBytes(Math.ceil(len/2))
            .toString('hex')
            .slice(0,len).toUpperCase();
    }
}
  