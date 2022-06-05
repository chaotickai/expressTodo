// IMORTANT: Change to hosting url if you plan to deploy this!!!
const appURL = `http://localhost:3000/todo`

// This will run our anon function once the DOM is safe to manipulate as of jQuery 3.0 (equivalent to "$(document).ready(anon function)")
$(function(){
    console.log("function ran")
    // Runs an ajax function with the default method GET on our url
    $.ajax({
        url: appURL
    })
    // If our GET is successful we get to play with the data we recieve here
    .done(function(data){
        // Clears out the default item we have in our todo list in the index.html file
        $(`#todosList`).empty()

        // Maps over the todos we recieve and turns them into html list elements
        data.map(function(todo){
            // Used for css by way of class
            var completed = todo.isComplete ? "completed" : ""

            // Adding each todo to our list as list elements
            $(`#todosList`).append(
                `<li data-id=${todo.id} class=${completed}>${todo.content}</li>`
            )
        })
    })
    // Runs a function if our GET fails and reports the error type
    .fail(function(e){
        console.error(`GET error ${e}`)
        alert(`Sorry, we coulnd't retrieve your todo list`)
    })
})