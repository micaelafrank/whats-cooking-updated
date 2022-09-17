fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(response => response.json())
    .then(data => loadRandomMeal(data));

const newRecipeBtn = document.querySelector('#newRecipeBtn');
newRecipeBtn.addEventListener('click', () => {
    const ulIngredients = document.querySelector('#ingredient-list');
    ulIngredients.innerHTML = " ";
    groceryListContainer.classList.add("hidden");
    // const starContainer = document.querySelector('#star-container');
    for (item of starSpans) {
        item.innerHTML = emptyStar;
    }
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(response => response.json())
        .then(data => loadRandomMeal(data));
});

const footerContainer = document.querySelector('#footer-container');
const main = document.querySelector('main');

window.addEventListener('scroll', () => {
    footerContainer.style.height = "60px";
    footerContainer.style.backgroundColor = "#507e8d";
    footerContainer.style.backgroundImage = "none";
});

function loadRandomMeal(data) {
    for (meals of data.meals) {
        let mealTitle = document.querySelector('#random-meal-title');
        mealTitle.textContent = meals.strMeal;
        let mealImage = document.querySelector('#meal-image');
        mealImage.src = meals.strMealThumb;
        let mealInstructions = document.querySelector('#random-meal-instructions');
        mealInstructions.textContent = meals.strInstructions;

        const ulIngredients = document.querySelector('#ingredient-list');

        // let asArray = Object.keys(meals);
        let newArray = Object.values(meals);
        console.log(newArray);
        // const substring = "strIngredient";
        const slicedArray = newArray.slice(9, 17);

        slicedArray.forEach(item => {
            if (item !== "") {
                btn = document.createElement('button');
                ulIngredients.appendChild(btn);
                btn.textContent = item;
                btn.addEventListener('click', clickBtn)
            }
        })
    }
}

const groceryListContainer = document.querySelector('#grocery-list-container');
const groceryListUl = document.querySelector('#grocery-list-items');

function clickBtn(e) {
    console.log(e)
    const targetItem = e.target;
    const myItem = e.target.textContent;
    const closeBtn = document.createElement("button");
    let liGrocery = document.createElement('li');
    closeBtn.textContent = `${myItem}` + "  X";
    liGrocery.appendChild(closeBtn);
    liGrocery.classList.add('groceryItems');
    targetItem.classList.add('after-clicked');
    groceryListUl.appendChild(liGrocery);
    let groceryItems = document.querySelectorAll('.groceryItems');
    groceryListContainer.classList.remove("hidden");
    for (li of groceryItems) {
        liGrocery.addEventListener('click', (e) => {
            targetItem.classList.remove('after-clicked');
            console.log(e);
            e.target.remove();
        });
    }
}

const emptyStar = '☆';
const fullStar = '★';

const starCollection = document.getElementsByClassName("glyph");
const starSpans = document.querySelectorAll('.star');
for (let star of starCollection) {
    star.addEventListener("click", addReview);
}

let recipeForm = document.getElementById("recipe-form");
let recipeDescription = document.getElementById("floatingTextarea");
let newRecipes = document.getElementById("new-recipes");

recipeForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let newReview = document.createElement("li");
    newReview.innerText = description.value
    newRecipes.append(newReview)
    e.target.reset()
    console.log("submit")
    //like button
    let likeBtn = document.createElement("button");
    newReview.append(likeBtn)
    likeBtn.innerText = 0;
    likeBtn.addEventListener("click", incrementBtn)
})
function incrementBtn(e) {
    let num = parseInt(e.target.innerText)
    let num2 = num + 1;
    e.target.innerText = num2;
}
let staticLi = document.querySelectorAll(".staticLi")

document.addEventListener("DOMContentLoaded", function () {
    for (const item of staticLi) {
        let likeBtn = document.createElement("button");
        item.append(likeBtn);
        likeBtn.innerText = 0;
        likeBtn.addEventListener("click", incrementBtn);
    }
})

function addReview(e) {
    console.log(e.target.innerHTML);
    // e.target.style.color = "white";
    e.target.innerText = fullStar;
    // e.target.classList.add = "fullStar";
    let idNum = e.target.attributes.id.value;
    while (idNum >= 1) {
        document.getElementById(`${idNum}`).innerText = fullStar;
        idNum--;
    }
}

function resetStars(e) {
    console.log(e.target.innerHTML);
    // e.target.style.color = "white";
    e.target.innerText = emptyStar;
    // e.target.classList.add = "fullStar";
    let idNum = e.target.attributes.id.value;
    while (idNum >= 1) {
        document.getElementById(`${idNum}`).innerText = emptyStar;
        idNum--;
    }
};

