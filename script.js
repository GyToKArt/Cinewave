const STATES = Object.freeze({
    Movies:"movies",
    Series:"series",
    Search:"search"
})

const SIDEBAR = document.querySelector(".sidebar")
const MAIN = document.querySelector("main")

const sleep = (time) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve()
        },time)
    })
}

let currentState = STATES.Movies;

async function AddCategory(category) {

    if (category.category_name === "") {
        return;
    }

    let categoryContainer = document.createElement("div")
    let title = document.createElement("h1")
    let cards = document.createElement("ul")
    
    categoryContainer.classList.add("genre")
    categoryContainer.appendChild(title)
    categoryContainer.appendChild(cards)

    categoryContainer.style.opacity = 0

    title.textContent = category["category_name"]

    MAIN.appendChild(categoryContainer)
 
    await sleep(100);

    categoryContainer.style.opacity = 10;
    categoryContainer.style.transform = "translateY(0px)";

}

function Init() {
    SIDEBAR.classList.add("show");
    OnStateChanged("")
}

function ChangeState(newState) {
    OnStateChanged(currentState)
    currentState = newState
}

async function OnStateChanged(oldState) {
    switch (currentState) {
        case STATES.Movies:
            const URL = "http://10.158.54.57:3000";
            const REQUEST = await fetch(URL);
            const CATEGORIES = await REQUEST.json()

            console.log(CATEGORIES)

            for (const CATEGORY of CATEGORIES) {
                await AddCategory(CATEGORY)
            }

    }
}

window.addEventListener("DOMContentLoaded", () => {
    Init()
})

