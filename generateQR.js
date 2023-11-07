const qrcode = require('qrcode');
const fs = require('fs');
const Jimp = require('jimp');

const qrCodeText = 'https://www.google.com/search?q=h2o+car+wash&oq=h2o+car&gs_lcrp=EgZjaHJvbWUqCggAEAAY4wIYgAQyCggAEAAY4wIYgAQyDQgBEC4YrwEYxwEYgAQyBggCEEUYOTIHCAMQABiABDIHCAQQABiABDIHCAUQABiABDIHCAYQABiABDIHCAcQABiABDIHCAgQABiABDIHCAkQABiABDIHCAoQABiABDIHCAsQABiABDIHCAwQABiABDIHCA0QABiABDIHCA4QLhiABNIBCDQ5MDRqMGo0qAIAsAIA&client=ms-android-xiaomi-rev1&sourceid=chrome-mobile&ie=UTF-8#lkt=LocalPoiReviews&trex=m_t:lcl_akp,rc_ludocids:10473744877784171447,rc_q:h2o%2520car%2520wash,ru_gwp:0%252C7,ru_q:h2o%2520car%2520wash,trex_id:JtoDaf&lpg=cid:CgIgAQ%3D%3D'; // Reemplaza con tu URL
const logoPath = './logo.png'; // Ruta a tu logo

const generateQRWithLogo = async () => {
  try {
    const qrCodeData = await qrcode.toDataURL(qrCodeText, {
        errorCorrectionLevel: 'H',
        width: 500, // Ancho en píxeles QR
        height: 500, // Alto en píxeles QR
      });
      
    // Carga la imagen del logo con Jimp
    const logo = await Jimp.read(logoPath);

    // Ajusta el tamaño del logo (por ejemplo, 50x50)
    logo.resize(175, 175);

    // Aplica un border radius al logo (borde redondeado)
    logo.circle({ radius: 87.5, x: 87.5, y: 87.5 });


    // Lee el código QR generado como imagen
    const qrCode = await Jimp.read(Buffer.from(qrCodeData.split(',')[1], 'base64'));

    // Combina el código QR con el logo en el centro
    qrCode.composite(logo, (qrCode.bitmap.width - logo.bitmap.width) / 2, (qrCode.bitmap.height - logo.bitmap.height) / 2, {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacityDest: 1,
      opacitySource: 1,
    });

    // Guarda el resultado en un archivo, puede cambiar el nombre del archivo.
    qrCode.write('qrCodeWithLogo.png', () => {
      console.log('Código QR con logo generado correctamente.');
    });
  } catch (error) {
    console.error('Error:', error);
  }
};

generateQRWithLogo();
