const express = require("express")
const bodyParser = require("body-parser")

const PORT = process.env.PORT

var app = express()
app.use(bodyParser.json())

const fs = require('fs')

const smoothies = JSON.parse(fs.readFileSync('smoothies.json'))

app.get('/smoothies', (req, res) => {
    let response = []

    const titleSort = ((a, b) => {
        let x = a.title
        let y = b.title

        return ((x < y) ? -1 : ((x > y) ? 1 : 0))
    })

    if (req.query.title != undefined) {
        response = smoothies.filter((smoothie) => { return smoothie.title == req.query.title }).sort(titleSort)
        
    } else {
        response = smoothies.map((smoothie) => {
            return {
                title: smoothie.title,
                url: smoothie.url,
                thumbnail: smoothie.thumbnail,
                tags: smoothie.tags,
                rating: smoothie.rating
            }
        }).sort(titleSort)
    }
    
    res.json(response)
})

app.all('*', function(req, res) {
    res.status(404).json({
        "status": 404,
        "error": "Not Found",
        "message": "Route you are trying to access does not exist",
    })
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})