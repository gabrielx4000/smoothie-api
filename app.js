const express = require("express")
const bodyParser = require("body-parser")

const PORT = process.env.PORT

var app = express()
app.use(bodyParser.json())

app.get('/hello', (req, res) => {
    res.json({ "hello": "world" })
})

app.listen(PORT, () => {
    console.log(`Server running...`);
})