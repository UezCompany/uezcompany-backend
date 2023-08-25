const validateBody = (req, res, next) => {
    const requestData = req.body;

    for (const field in requestData) {
        if (
            requestData[field] === undefined ||
            requestData[field] === '' ||
            requestData[field] === null
        ) {
            return res.status(400).json({ message: 'Todos os campos devem ser preenchidos' });
        }
    }

    console.log("Passou pelo validateBody com sucesso!")
    next();
}

module.exports = {
    validateBody
}
