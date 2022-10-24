

//GLOBAL VARIABLES

const welcomeForm = document.querySelector("#welcomeForm");
const gridContainer = document.querySelector(".grid-container");

const categoryPage = document.querySelector(".category-page");
const peoplePage = document.querySelector(".people-page");
const pricePage = document.querySelector(".price-page");
const headerText = document.querySelector("#header-text");

const categories = [
    {
        type: "education",
        image: "https://www.syfy.com/sites/syfy/files/styles/blog-post-embedded--tablet-1_5x/public/2019/10/faceoff_cage.jpg"
    },
    {
        type: "recreational",
        image: "https://www.syfy.com/sites/syfy/files/styles/blog-post-embedded--tablet-1_5x/public/2019/10/faceoff_cage.jpg"
    },
    {
        type: "social",
        image: "https://www.syfy.com/sites/syfy/files/styles/blog-post-embedded--tablet-1_5x/public/2019/10/faceoff_cage.jpg"
    },
    {
        type: "diy",
        image: "https://www.syfy.com/sites/syfy/files/styles/blog-post-embedded--tablet-1_5x/public/2019/10/faceoff_cage.jpg"
    },
    {
        type: "charity",
        image: "https://www.syfy.com/sites/syfy/files/styles/blog-post-embedded--tablet-1_5x/public/2019/10/faceoff_cage.jpg"
    },
    {
        type: "cooking",
        image: "https://www.syfy.com/sites/syfy/files/styles/blog-post-embedded--tablet-1_5x/public/2019/10/faceoff_cage.jpg"
    },
    {
        type: "relaxation",
        image: "https://www.syfy.com/sites/syfy/files/styles/blog-post-embedded--tablet-1_5x/public/2019/10/faceoff_cage.jpg"
    },
    {
        type: "music",
        image: "https://www.syfy.com/sites/syfy/files/styles/blog-post-embedded--tablet-1_5x/public/2019/10/faceoff_cage.jpg"
    },
    {
        type: "busywork",
        image: "https://www.syfy.com/sites/syfy/files/styles/blog-post-embedded--tablet-1_5x/public/2019/10/faceoff_cage.jpg"
    }
]


//FETCH BORED API 
fetch("http://www.boredapi.com/api/activity")
.then(response => response.json())
.then(boredActivity => {
    console.log(boredActivity);
    const activityType = boredActivity.type;
    const activityDescription = boredActivity.activity;
    const activityPrice = boredActivity.price;

    

})

welcomeFormEvent();
const username = document.querySelector("#username");


//WELCOME FORM EVENT LISTENER
function welcomeFormEvent () {
    welcomeForm.addEventListener("submit", e => {
        e.preventDefault();
        const welcomePage = document.querySelector(".welcome-page");
        welcomePage.classList.add("hide");
    
        const categoryPage = document.querySelector(".category-page");
        categoryPage.classList.remove("hide");
    
        let username = e.target.name.value;
        // const pName = document.createElement("p");
        // pName.textContent = username;
        // pName.classList.add("hide");
    
        headerText.innerHTML = `Whatchya in the mood for <span id = "username">${username}</span>?`;
    
        welcomeForm.reset();

        //CREATE IMAGES FOR NEXT PAGE
        createGridImages();
    
    });
}





//CREATE IMAGES FOR CATEGORY ARRAY OBJECTS
function createGridImages (){ 
    const username = document.querySelector("#username");
    categories.forEach(category => {
        const divGridItem = document.createElement("div");

        const image = document.createElement("img");
        image.src = category.image;
        image.id = category.type;

        const p = document.createElement("p");
        p.textContent = category.type;

        divGridItem.append(image, p)
        divGridItem.classList.add("grid-item");
        
        gridContainer.append(divGridItem);

        gridImageEventListener(image); 

    })
}

//CLICK EVENT ON GRID IMAGES 
function gridImageEventListener (image){
    
    image.addEventListener("click", () => {

        const username = document.querySelector("#username").innerHTML;
        headerText.innerHTML = `How many are ya <span id = "username">${username}</span>?`;

        categoryPage.classList.add("hide");
        peoplePage.classList.remove("hide");

        howManyPeopleButtons()
    })
}

//HOW MANY PEOPLE BUTTONS + EVENT LISTENER
function howManyPeopleButtons (){
    const pOne = document.createElement("p");
    pOne.innerHTML = `<button id="1">Just Me!</button>`;

    const pTwo = document.createElement("p");
    pTwo.innerHTML = `<button id="2">Me & a buddy!</button>`;

    const pThree = document.createElement("p");
    pThree.innerHTML = `<button id="3">We're a whole group!</button>`;

    peoplePage.append(pOne, pTwo, pThree);

    const peopleButton = document.querySelector(".people-page button");

    peopleButton.addEventListener("click", ()=> {
        const username = document.querySelector("#username").innerHTML;
        headerText.innerHTML = `How much ya wanna spend <span id = "username">${username}</span>?`;

        peoplePage.classList.add("hide");
        pricePage.classList.remove("hide");

    })
}

