const QRCode = require("qrcode");
const generator = require('generate-password');

const generateQRCode = (data) => {
    return new Promise((resolve, reject) => {
        QRCode.toDataURL(JSON.stringify(data), function (err, url) {
            if (err) {
                return reject(err);
            }
            resolve(url);
        });   
    });
}

const generateCode = (data) => {
    const code = generator.generate({
        length: 6,
        numbers: true,
        symbols: false,
        lowercase: true,
        uppercase: true,
        excludeSimilarCharacters: true,
        strict: true
    });

    return code;
}

module.exports = {
    generateQRCode,
    generateCode,
};
