const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 5501;

// Configuração do armazenamento de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Middleware para servir arquivos estáticos
app.use(express.static('PUBLICACAO'));
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servindo o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'publicacao.html'));
});

// Rota para lidar com postagens
app.post('/posts', upload.single('media'), (req, res) => {
    const postData = {
        content: req.body.content,
        media: req.file ? `/uploads/${req.file.filename}` : null,
        pollQuestion: req.body.pollQuestion,
        pollOptions: Array.isArray(req.body.pollOptions) ? req.body.pollOptions : [req.body.pollOptions],
        isPublic: req.body.visibility === 'on'
    };

    res.json(postData);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${5501}`);
});
