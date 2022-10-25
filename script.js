

//GLOBAL VARIABLES
const selections = [];
const welcomeForm = document.querySelector("#welcomeForm");
const gridContainer = document.querySelector(".grid-container");
const categoryPage = document.querySelector(".category-page");
const peoplePage = document.querySelector(".people-page");
const pricePage = document.querySelector(".price-page");
const activityDisplay = document.querySelector(".activity-display")
const headerText = document.querySelector("#header-text");
const activityDisplayInfo = document.querySelector(".activity-info");

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
        
        //HEADERS
        const categoryHeader = document.querySelector("#category-page-header");
        categoryHeader.innerHTML = `Whatchya in the mood for <span id = "username">${username}</span>?`
        const peopleHeader = document.querySelector("#people-page-header");
        peopleHeader.innerHTML = `How many people are ya <span id = "username">${username}</span>?`
        const priceHeader = document.querySelector("#price-page-header");
        priceHeader.innerHTML = `How much ya wanna spend <span id = "username">${username}</span>?`
        const activityHeader = document.querySelector("#activity-page-header");
        activityHeader.innerHTML = `Here's a good activity for ya <span id = "username">${username}</span>!`


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
        categoryPage.classList.add("hide");
        peoplePage.classList.remove("hide");
        selections.push(image.id);


        howManyPeopleButtons()
    })
}

//HOW MANY PEOPLE BUTTONS + EVENT LISTENER
function howManyPeopleButtons (){
    const divOne = document.createElement("div");
    divOne.innerHTML = `<button id="1">Just Me!</button>`;

    const divTwo = document.createElement("div");
    divTwo.innerHTML = `<button id="2">Me & a buddy!</button>`;

    const divThree = document.createElement("div");
    
    divThree.innerHTML = `<button id=${getRandomItem()}>We're a whole group!</button>`;

    peoplePage.append(divOne, divTwo, divThree);

    const peopleButton = document.querySelectorAll(".people-page button");
    peopleButton.forEach((button)=> {

        button.addEventListener("click", ()=> {
            peoplePage.classList.add("hide");
            pricePage.classList.remove("hide");

            selections.push(button.id);
            howMuchMoneyButton();

        })
    })
    
}

function howMuchMoneyButton () {
    const divFree = document.createElement("div");
    divFree.innerHTML = `<button id="free">No Money</button>`;

    const divMoney = document.createElement("div");
    divMoney.innerHTML = `<button id="money">$</button>`;

    pricePage.append(divFree, divMoney);

    const moneyButton = document.querySelectorAll(".price-page button");


    moneyButton.forEach((button)=> {

        button.addEventListener("click", ()=> {
            pricePage.classList.add("hide");
            activityDisplay.classList.remove("hide");
            let cost;
            if (moneyButton.id ==="free"){
                cost = "price=0.0"
            } else if (moneyButton.id === "money"){
                cost = "minprice=0.1&maxprice=1"
            };
            selections.push(cost);
                    
            //PUT FETCH
            fetch(`http://www.boredapi.com/api/activity?type=${selections.shift()}&participants=${selections.shift()}&${selections.shift()}`)
            .then(response => response.json())
            .then(boredActivity => {
                const activityType = boredActivity.type;
                const activityDescription = boredActivity.activity;
                const activityPrice = boredActivity.price;
                const activity_h2 = querySelector('#activity');
                activity_h2.innerText = activityDescription;

            })

        })
    })

}




function getRandomItem() {
    const items = [3, 4, 5, 8 ];
    return items[Math.floor(Math.random() * items.length)];
}