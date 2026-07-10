const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:{PORT}`);
});