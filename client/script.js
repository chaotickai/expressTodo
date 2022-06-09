// IMORTANT: Change to hosting url if you plan to deploy this!!!
const appURL = `http://localhost:3000/todo`

// This will run our anon function if a key is pressed while the input field with the id "todoEntry" is focused
// The C in CRUD (Create)
$(`#todoEntry`).on(`keypress`, function(event) {
    // Checks to see if the key being pressed is the enter key for submitting and makes sure the input field isn't empty before running our functions
    if(event.which === 13 && $(this).val() !== ``){
        // Takes the text entered in the imput field and puts it in an object because thats how the request body on the server end likes it
        let todoText = {
            content: $(this).val()
        } 

        // Runs an ajax function with the POST method and our todo object as the data being passed
        $.ajax({
            url: appURL,
            method: `POST`,
            data: todoText
        })
        
        // If our POST is successful we recieve the full todo object and turn that into a list item to be added to our users todo list
        .done((data) => {
            $(`#todosList`).append(
                `<li data-id=${data.id}>${data.content} <button data-id=${data.id}>Delete</button></li>`
            )

            // This clears out the input field once the user has submitted their todo
            $(`#todoEntry`).val(``)
        })

        // Runs a function if our POST fails and reports the error type
        .fail((error) => {
            console.error(`POST error ${error}`)

            alert(`Sorry, we coulnd't save your new todo`)
        })
    }
})

// This will run our anon function once the DOM is safe to manipulate as of jQuery 3.0 (equivalent to "$(document).ready(anon function)")
// The R in CRUD (Read)
$(() => {
    // Runs an ajax function with the default method GET on our url
    $.ajax({
        url: appURL
    })

    // If our GET is successful we get to play with the data we recieve here
    .done((data) => {
        // Clears out the default item we have in our todo list in the index.html file
        $(`#todosList`).empty()

        // Maps over the todos we recieve and turns them into html list elements
        data.map(function(todo){
            // Used for css by way of class
            let completed = todo.isComplete ? `completed` : ``

            // Adding each todo to our list as list elements
            $(`#todosList`).append(
                `<li data-id=${todo.id} class=${completed}>${todo.content} <button data-id=${todo.id}>Delete</button></li>`
            )
        })
    })

    // Runs a function if our GET fails and reports the error type
    .fail((error) => {
        console.error(`GET error ${error}`)

        alert(`Sorry, we coulnd't retrieve your todo list`)
    })
})

// This will run our anon function if a list item that is in our document
// The U in CRUD (Update)
$(document).on('click', `li` , function(event){
    // Binds "this", our list item in this case, to a variable for use in the rest of the function
    let todo = this

    // Grabs the id from our list item
    let todoId = $(todo).data('id')

    // Runs an ajax function with the PUT method
    $.ajax({
        url: `${appURL}/${todoId}`,
        method: `PUT`
    })

    // If our PUT is successful we toggle the completed class to reflect the change on the server side list
    .done((data) => {
        $(todo).toggleClass(`completed`)
    })

    // Runs a function if our PUT fails and reports the error type
    .fail((error) => {
        console.error(`PUT error ${error}`)

        alert(`Sorry, we coulnd't mark your todo as completed`)
    })
})

// This will run our anon function if we click on a button in our document
// The D in CRUD (Delete)
$(document).on(`click`, `button`, function(event){
    // Because our button is a child of our list item, we have to add this to stop our click from registering on the list item as well
    event.stopPropagation()

    // Binds "this", our button in this case, to a variable for use in the rest of the function
    let todo = this

    // Grabs the id from our button
    let todoId = $(todo).data('id')
    
    // Runs an ajax function with the DELETE method
    $.ajax({
        url: `${appURL}/${todoId}`,
        method: `DELETE`
    })

    // If our DELETE is successful remove the list item to reflect the server side list
    .done(() => {
        $(todo).parent().remove()
    })

    // Runs a function if our DELETE fails and reports the error type
    .fail(() => {
        console.error(`DELETE error ${error}`)

        alert(`Sorry, we coulnd't delete your todo`)
    })
})