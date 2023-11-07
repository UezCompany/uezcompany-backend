const express = require('express')
const router = express.Router()
const { getAllUzers, getUzerById, createUzer, updateUzer, deleteUzer, updateUzerPhoto } = require('../../controllers/uzerController')
const { validateBody } = require('../../middleware/validateMiddlewares')
const validateJWT = require('../../middleware/authMiddleware')
const multer = require('multer')
const S3 = require('../../aws')
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        // Extração da extensão do arquivo original:
        const extensaoArquivo = file.originalname.split('.')[file.originalname.split('.').length - 1];

        // Cria um código randômico que será o nome do arquivo
        const novoNomeArquivo = require('crypto')
            .randomBytes(16)
            .toString('hex');

        // Indica o novo nome do arquivo:
        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
    }
});

const upload = multer({ storage });

const uploadImageToS3 = async (filePath, fileName, bucketName) => {
    const imageBuffer = fs.readFileSync(filePath);
    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: imageBuffer,
        ACL: 'public-read', // Define as permissões para a imagem
    };

    try {
        const data = await S3.upload(params).promise();
        return data.Location; // A URL pública da imagem no S3
    } catch (error) {
        console.error('Erro ao fazer upload da imagem no S3:', error);
        throw error;
    }
};

router.get('/uzers', getAllUzers)
router.get('/uzers/:id', getUzerById)
// router.get('/uzers', getAllUzers)
// router.get('/uzers/:id', getUzerById)


router.put('/uzers/:id', validateJWT, validateBody, updateUzer)
router.post('/uzers/profilephoto', upload.single('profilephoto'), validateJWT, async (req, res, next) => {
    const filePath = req.file.path;
    const fileName = req.file.originalname;
    const bucketName = 'uezcompanys3';

    try {
        const imageUrl = await uploadImageToS3(filePath, fileName, bucketName);
        req.body.photoUrl = imageUrl;
        next()
    } catch (error) {
        console.error('Erro ao fazer upload da imagem no S3:', error);
        res.status(500).json({ error: 'Erro ao fazer upload da imagem no S3' });
    }
}, updateUzerPhoto);
router.delete('/uzers/:id', validateJWT, deleteUzer)


module.exports = router

