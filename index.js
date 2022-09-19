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
                btn.addEventListener('click', addToGroceryList)
            }
        });
    }

}
const groceryListContainer = document.querySelector('#grocery-list-container');
// const star1 = document.querySelector('#1');
// const star2 = document.querySelector('#2');
// const star3 = document.querySelector('#3');
// const star4 = document.querySelector('#4');
// const star5 = document.querySelector('#5');


function addToGroceryList(e) {
    const myItem = e.target.textContent;
    e.target.classList.add("after-clicked");
    console.log(e.target.textContent);
    const li = document.createElement('li');
    li.innerHTML = myItem;
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "X";
    closeBtn.classList.add("close");
    li.appendChild(closeBtn);
    document.querySelector('#grocery-list-items').appendChild(li);
    groceryListContainer.classList.remove("hidden");
    closeBtn.addEventListener('click', removeItem);
};

function removeItem(e) {
    console.log(e);
    e.target.parentNode.style.opacity = 1;
    e.target.parentNode.remove();
    e.target.remove();
}

const emptyStar = '☆';
const fullStar = '★';

// let starCollection = document.getElementsByClassName("glyph");
let starCollection = document.querySelectorAll('.glyph span');
// for (let star of starCollection) {
//     star.addEventListener("click", addReview);
// }

starCollection.forEach(star => {
    star.addEventListener('click', function () {
        let rating = this.getAttribute("data-rating");
        return SetRating(rating, starCollection);
    });
});


function SetRating(rating, starCollection) {
    let len = starCollection.length;
    console.log(rating);

    for (let i = 0; i < len; i++) {
        if (i < rating) {
            starCollection[i].innerHTML = '★';
        } else {
            starCollection[i].innerHTML = '☆';
        }
    }
};

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
        item.append(likeBtn)
        likeBtn.innerText = 0;
        likeBtn.addEventListener("click", incrementBtn)
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


// function addStarStyling(e){
//     let idNum = e.target.attributes.id.value;

//     if (idNum === 1){
//         document.getElementById(`1`).style.className = "starChoice";
//     }
//     else if (idNum === 2) {
//         document.getElementById(`1`).style.className = "starChoice";
//         document.getElementById(`2`).style.className = "starChoice";
//     }
//     else if (idNum === 3){
//         document.getElementById(`3`).style.className = "starChoice";
//         document.getElementById(`2`).style.className = "starChoice";
//         document.getElementById(`1`).style.className = "starChoice";
//     }
//     else if (idNum === 4) {
//         document.getElementById(`4`).style.className = "starChoice";
//         document.getElementById(`3`).style.className = "starChoice";
//         document.getElementById(`2`).style.className = "starChoice";
//         document.getElementById(`1`).style.className = "starChoice";
//     }
//     else if (idNum === 5) {
//         document.getElementById(`5`).style.className = "starChoice";
//         document.getElementById(`4`).style.className = "starChoice";
//         document.getElementById(`3`).style.className = "starChoice";
//         document.getElementById(`2`).style.className = "starChoice";
//         document.getElementById(`1`).style.className = "starChoice";
//     }
// }

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
}

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById("footer-container").style.backgroundImage = "none";
        document.getElementById("footer-container").style.height = "60px";
    } else {
        document.getElementById("footer-container").style.backgroundImage = "url('images/footer-new.png')";
        document.getElementById("footer-container").style.height = "200px";
    }
}
