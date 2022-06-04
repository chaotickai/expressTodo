const express = require(`express`)
const bodyParser = require(`body-parser`)
const cors = require(`cors`)
const logger = require(`morgan`)
const chalk = require(`chalk`)

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(logger(`dev`))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get(`/`, (req, res) => {
    res.send(`I'm alive`)
})

app.listen(port, () => {
    console.log(`App listening on port ${chalk.cyanBright(port)}!`)
})