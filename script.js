
//GLOBAL VARIABLES
const selections = [];
const welcomePage = document.querySelector(".welcome-page");
const welcomeForm = document.querySelector("#welcomeForm");
const gridContainer = document.querySelector(".grid-container");
const categoryPage = document.querySelector(".category-page");
const peoplePage = document.querySelector(".people-page");
const pricePage = document.querySelector(".price-page");
const activityDisplay = document.querySelector(".activity-display")
const headerText = document.querySelector("#header-text");
const activityDisplayInfo = document.querySelector(".activity-info");
const submitButton = document.querySelector("#submit-button");
const username = document.querySelector("#username");


//INITIATE FORM + SUBMIT BUTTON LISTENERS
welcomeFormEvent();
buttonTextEnter (submitButton, "Help!");
buttonTextLeave (submitButton, "I'm so bored");
howManyPeopleButtons()
howMuchMoneyButton();
createReset();

//FETCH FOR CATEGORIES PAGE
fetch("http://localhost:3000/grids")
.then(res=>res.json())
.then(categories => createGridImages(categories))

//WELCOME FORM EVENT LISTENER
function welcomeFormEvent () {
    welcomeForm.addEventListener("submit", e => {
        e.preventDefault();
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
    
    });
}

//CREATE IMAGES FOR CATEGORY PAGE
function createGridImages (categories){ 
    const username = document.querySelector("#username");

    //RENDER IMAGES AND TEXT ON CATEGORY PAGE
    categories.forEach(category => {
        const divGridItem = document.createElement("div");
        const image = document.createElement("img");
        image.src = category.image;
        image.id = category.type;
        divGridItem.append(image)
        divGridItem.classList.add("grid-item");
    
        gridContainer.append(divGridItem);

        const p = document.createElement("p");
        p.classList.add("grid-p");
        gridDisplayText (image, p, category, divGridItem)

        gridImageEventListener(p, image); 
    })
}

//CLICK EVENT ON GRID IMAGES 
function gridImageEventListener (p, image){
    p.addEventListener("click", () => {
        categoryPage.classList.add("hide");
        peoplePage.classList.remove("hide");
        selections.push(image.id);  
    })
}

//HOW MANY PEOPLE BUTTONS + EVENT LISTENER
function howManyPeopleButtons (){
    const game = document.querySelector("#game");
    const single = document.createElement("img");
    single.className = "gameImg";
    single.src = "imgs/single.png";
    single.style = "bottom: 45%; left: 0%; height: 100px; width: auto;"
    const pair = document.createElement("img");
    pair.className = "gameImg";
    pair.src = "imgs/pair.png"
    pair.style = "bottom: 80%; left: 45%; height: 100px; width: auto;"
    const group = document.createElement("img");
    group.className = "gameImg";
    group.src = "imgs/group.png"
    group.style = "bottom: 45%; left: 80%; height: 100px; width: auto;"
    const divPlayer = document.createElement("div");
    divPlayer.id = "player";
    divPlayer.style = "bottom: 20%; left: 50%;" 
    game.append(single, pair, group, divPlayer);
    
    //GAME EVENT LISTENER 
    document.addEventListener("keydown", e=>{
        if (!peoplePage.classList.contains("hide"))
        {
            if (e.key ==="ArrowLeft") {             
                divPlayer.style.transform = "scaleX(-1)";
                const leftNumbers = divPlayer.style.left.replace("%", "");
                const leftMove = parseInt(leftNumbers, 10);
                const bottomNumbers = divPlayer.style.bottom.replace("%", "");
                const bottomMove = parseInt(bottomNumbers, 10);
                if (leftMove>0) {
                    divPlayer.style.left = (`${leftMove-5}%`);                    
                }                                       
            }
            if (e.key ==="ArrowRight") {            
                divPlayer.style.transform = "";
                const numbers = divPlayer.style.left.replace("%", "");
                const move = parseInt(numbers, 10);
                if (move<90){
                divPlayer.style.left = (`${move+5}%`);
                }  
            }
            if (e.key ==="ArrowDown") {
                const numbers = divPlayer.style.bottom.replace("%", "");
                const move = parseInt(numbers, 10);
                if (move>0) {
                divPlayer.style.bottom = (`${move-5}%`);
                }
            }
            if (e.key ==="ArrowUp") {
                const numbers = divPlayer.style.bottom.replace("%", "");
                const move = parseInt(numbers, 10);
                if (move<90){
                    divPlayer.style.bottom = (`${move+5}%`);
                }
            }
            
            //PLAYER REACHES SINGLE OPTION
            if(divPlayer.style.left==="5%" && divPlayer.style.bottom>="45%" && divPlayer.style.bottom<="55%") { 
                peoplePage.classList.add("hide");
                pricePage.classList.remove("hide");
                selections.push("1");
                console.log("1");
                
                divPlayer.style = "bottom: 20%; left: 50%;"                                               
            }
            //PLAYER REACHES DOUBLE OPTION
            if(divPlayer.style.left>="45%" && divPlayer.style.left<="55%" && divPlayer.style.bottom>="80%" && divPlayer.style.bottom<="90%") {
                peoplePage.classList.add("hide");
                pricePage.classList.remove("hide");
                selections.push("2");
                divPlayer.style = "bottom: 20%; left: 50%;" 
                console.log("2");                                   
            }
            //PLAYER REACHES GROUP OPTION
            if(divPlayer.style.left>="80%" && divPlayer.style.left<="90%" && divPlayer.style.bottom>="45%" && divPlayer.style.bottom<="55%") { 
                peoplePage.classList.add("hide");
                pricePage.classList.remove("hide");
                selections.push(`${getRandomItem()}`);                   
                divPlayer.style = "bottom: 20%; left: 50%;" 
                console.log("3");                                    
            }
        }
    })   
}

// HOW MUCH MONEY PAGE
function howMuchMoneyButton () {
    const divFree = document.createElement("div");
    divFree.innerHTML = `<button id="free">No Money</button>`;
    const divMoney = document.createElement("div");
    divMoney.innerHTML = `<button id="money">$</button>`;
    pricePage.append(divFree, divMoney);

    const moneyButton = document.querySelectorAll(".price-page button");
    buttonTextEnter(moneyButton[0], "Free plz!");
    buttonTextLeave(moneyButton[0], "No money" );
    buttonTextEnter(moneyButton[1], "I got some dough!");
    buttonTextLeave(moneyButton[1], "$");

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
                    
            //FETCH BORED API
            fetch(`http://www.boredapi.com/api/activity?type=${selections.shift()}&participants=${selections.shift()}&${selections.shift()}`)
            .then(response => response.json())
            .then(boredActivity => {
                const activityType = boredActivity.type;
                const activityDescription = boredActivity.activity;
                const activityPrice = boredActivity.price;
                const activity_h2 = document.querySelector('#activity');
                if (boredActivity.activity !== undefined){
                    activity_h2.innerText = activityDescription;
                } else {
                    activity_h2.innerHTML = `<a href="https://www.dictionary.com/e/memes/">Why dontchya do some light reading!</a>`;
                }  
            })
        })
    })
}

//RESET PROGRAM FUNCTION
function createReset() {
    const restartButton = document.createElement("button");
            const div = document.createElement("div");
            restartButton.textContent = "Give me another idea!";
            buttonTextEnter(restartButton, "I'm still bored");
            buttonTextLeave(restartButton, "Give me another idea!");
            div.append(restartButton);
            activityDisplayInfo.append(div);

            restartButton.addEventListener("click", ()=> {
                // location.reload();
                activityDisplay.classList.add("hide");
                welcomePage.classList.remove("hide");
            })
}

//RANDOM NUMBER FOR 3+ PLAYERS
function getRandomItem() {
    const items = [3, 4, 5, 8 ];
    return items[Math.floor(Math.random() * items.length)];
}

//GLOBAL BUTTON ON MOUSEENTER 
function buttonTextEnter(button, buttonText = "") {
    button.addEventListener("mouseenter", ()=> {
        button.classList.remove("button")
        button.classList.add("submit-button-hover")
        if (button.id === "submit-button") {
            button.value = buttonText; 
        } else if (button.id !== "submit-button"){
            button.innerHTML = buttonText;
        }
    })
}

//GLOBAL BUTTON ON MOUSELEAVE
function buttonTextLeave(button, buttonText = "") {
    button.addEventListener("mouseleave", ()=> {
        button.classList.remove("submit-button-hover")
        button.classList.add("button")
        if (button.id === "submit-button") {
            button.value = buttonText; 
        } else if (button.id !== "submit-button"){
            button.innerHTML = buttonText;
        }
    })
}

//CATEGORY PAGE DISPLAY TEXT ON MOUSEOVER 
function gridDisplayText (image, p, category, divGridItem) {
    image.addEventListener("mouseover", ()=> {
        p.textContent = category.type;
        divGridItem.append(p);
        divGridItem.removeChild(image);

        setTimeout(()=> {
            divGridItem.append(image);
            divGridItem.removeChild(p);
        }, 500);
    })

}