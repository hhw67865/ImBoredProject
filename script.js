fetch("http://www.boredapi.com/api/activity?type=${}")
.then(response => response.json())
.then(boredActivity => {
    console.log(boredActivity);
})

//GLOBAL VARIABLES


let username;

//WELCOME FORM EVENT LISTENER
const welcomeForm = document.querySelector("#welcomeForm");
welcomeForm.addEventListener("submit", e => {
    e.preventDefault();
    const welcomePage = document.querySelector(".welcome-page");
    welcomePage.classList.add("hide");

    const categoryPage = document.querySelector(".category-page");
    categoryPage.classList.remove("hide");

    let username = e.target.name.value;
    // console.log(username);

    welcomeForm.reset();

    const body = document.querySelector("body");
    const mainScript = document.createElement("script");
    mainScript.src = "mainscript.js"
    body.append(mainScript);

});
