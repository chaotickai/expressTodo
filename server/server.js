// App modules
const express = require(`express`)
const bodyParser = require(`body-parser`)
const cors = require(`cors`)

// Dev Modules
const logger = require(`morgan`)
const chalk = require(`chalk`)

//Starts our express instance
const app = express()

// Host sets port, otherwise default to 3000
const port = process.env.PORT || 3000

// Starts morgan in dev mode, useful for seeing http request while developing
app.use(logger(`dev`))

// Gets around high API security
app.use(cors())

// Parses any urlencoded data we recieve
app.use(bodyParser.urlencoded({ extended: false }));
// Parses any json we recieve
app.use(bodyParser.json());

// Serves the static files in our "client" folder
app.use(express.static('../client'))

// Sets a starting todo object
// Empty the array to make the list start blank
let todoList = [
    {
        // For separating the different todos, each should be unique
        id: 1,
        // What users will actually see on their todo list
        content: `Make a todo list`,
        // Mainly used for styling
        isComplete: false
    }
]

let idNum = 2

// Route handler for requests to /todo
app.route(`/todo`)
    // Handler for GETs on the /todo path (Shows our data to whos asking for it)
    // The R in CRUD (Read)
    .get((req, res) => {
        // Sends our todos back as a JSON object (Since we're passing objects anyway we could use res.send, but better safe than sorry)
        res.json(todoList)
    })

    // Handler for POSTs on the /todo path
    // The C in CRUD (Create)
    .post((req, res) => {
        // Takes the data we're given from the post and puts it into our todo object format
        let recievedTodo = {
            id: idNum,
            content: req.body.content,
            isComplete: false
        }

        // Increments our idNum for every new todo to keep their ids unique
        idNum++

        // Adds our new todo to todoList, our server side list of todos
        todoList.push(recievedTodo)

        // Sends back our full todo back to the client as a JSON object
        res.json(recievedTodo)
    })

// Binds server with specified port to listen for any connections (Basically makes the server work)
app.listen(port, () => {
    console.log(`App listening on port ${chalk.magenta.underline(port)}!`)
})