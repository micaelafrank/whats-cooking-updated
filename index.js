fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(response => response.json())
    .then(data => loadRandomMeal(data));

const newRecipeBtn = document.querySelector('#newRecipeBtn');
newRecipeBtn.addEventListener('click', () => {
    const ulIngredients = document.querySelector('#ingredient-list');
    ulIngredients.innerHTML = " ";
    groceryListContainer.classList.add("hidden");
    // const starContainer = document.querySelector('#star-container');
    for (item of starCollection) {
        item.innerHTML = emptyStar;
    }
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(response => response.json())
        .then(data => loadRandomMeal(data));
});

function loadReviewPreview() {
    fetch('http://localhost:3000/reviews')
        .then(response => response.json())
        .then(data => loadTopFeedback(data))
}

function loadTopFeedback(reviews) {
    console.log(reviews)
    const firstReviewUser = document.querySelector(`#reviewedBy1`);
    firstReviewUser.textContent = reviews[0].username;
    const firstReviewText = document.querySelector(`#meal-review1`);
    firstReviewText.textContent = reviews[0].description;
    const firstDish = document.querySelector('#dishName');
    firstDish.innerText = reviews[0].dishtitle.toUpperCase();
    const btn1 = document.querySelector('#button1');
    btn1.textContent = reviews[0].likes;
    
    const secondReviewUser = document.querySelector(`#reviewedBy2`);
    secondReviewUser.textContent = reviews[1].username;
    const secondReviewText = document.querySelector(`#meal-review2`);
    secondReviewText.textContent = reviews[1].description;
    const dish2 = document.querySelector('#dishName2');
    dish2.textContent = reviews[1].dishTitle.toUpperCase();
    const btn2 = document.querySelector('#button2');
    btn2.textContent = `${reviews[1].likes}`;

    const thirdUser = document.querySelector(`#reviewedBy3`);
    thirdUser.textContent = reviews[2].username;
    const thirdText = document.querySelector(`#meal-review3`);
    thirdText.textContent = reviews[2].description;
    const dish3 = document.querySelector('#dishName3');
    dish3.textContent = reviews[2].dishTitle.toUpperCase();
    const btn3 = document.querySelector('#button3');
    btn3.textContent = `${reviews[2].likes}`;

    // const fourthUser = document.querySelector(`#reviewedBy4`);
    // fourthUser.textContent = reviews[3].username;
    // const fourthText = document.querySelector(`#meal-review4`);
    // fourthText.textContent = reviews[3].description;
    // const dish4 = document.querySelector('#dishName4');
    // dish4.textContent = reviews[3].dishTitle.toUpperCase();
    // const btn4 = document.querySelector('#button4');
    // btn4.textContent = `${reviews[3].likes}`;

    // console.log(reviews)
    // reviews.review.forEach((review) => {
    //     for (let i = 0; i < 4; i++) {
    //         const reviewedBy = document.querySelector(`#reviewedBy${i}`);
    //         reviewedBy.textContent = review[i].username;
    //         const reviewText = document.querySelector(`#meal-review${i}`);
    //         reviewText.textContent = review[i].description;
    //         console.log(`reviewed by: ${reviewedBy}, feedback: ${reviewText}`);
    //         i++;
    //     }
    // }
}

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
    loadReviewPreview();
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
let recipeTitle = document.querySelector('#random-meal-title')

starCollection.forEach(star => {
    star.addEventListener('click', function () {
        let rating = this.getAttribute("data-rating");
       return setRating(rating, starCollection);
    });
});


function setRating(rating, starCollection) {
    let len = starCollection.length;
    console.log(rating);

    for (let i = 0; i < len; i++) {
        if (i < rating) {
            starCollection[i].innerHTML = '★';
        } else {
            starCollection[i].innerHTML = '☆';
        }
    }

    fetch('http://localhost:3000/userRating',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json"
        },
        body: JSON.stringify({
            "recipe": recipeTitle,
            "rating": rating,
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log('Success:', data)
        })
}


// let recipeForm = document.getElementById("recipe-form");
// let recipeDescription = document.getElementById("floatingTextarea");
// let newRecipes = document.getElementById("new-recipes");

// recipeForm.addEventListener("submit", function (e) {
//     e.preventDefault();
//     let newReview = document.createElement("li");
//     newReview.innerText = description.value
//     newRecipes.append(newReview)
//     e.target.reset()
//     console.log("submit")
    //like button
//     let likeBtn = document.createElement("button");
//     newReview.append(likeBtn)
//     likeBtn.innerText = 0;
//     likeBtn.addEventListener("click", incrementBtn)
// })
// let staticLi = document.querySelectorAll(".staticLi")

// document.addEventListener("DOMContentLoaded", function () {
//     for (const item of staticLi) {
//         let likeBtn = document.createElement("button");
//         item.append(likeBtn)
//         likeBtn.innerText = 0;
//         likeBtn.addEventListener("click", incrementBtn)
//     }
// })

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


// let buttons = document.querySelectorAll('.likeButton')
// buttons.forEach(btn => {
//     btn.textContent = `${reviews.likes} likes`
//     btn.addEventListener('click', incrementBtn);
// })

//         console.log(e.target.dataset);
//         likes(e)
//     })
// })

// recipeForm.addEventListener("submit", function (e) {
//     e.preventDefault();
//     let newReview = document.createElement("li");
//     newReview.innerText = description.value
//     newRecipes.append(newReview)
//     e.target.reset()
//     console.log("submit")
//     //like button
//     let likeBtn = document.createElement("button");
//     newReview.append(likeBtn)
//     likeBtn.innerText = 0;
//     likeBtn.addEventListener("click", incrementBtn)
// })

let likeBtnAll = document.querySelectorAll('.like-button-heart')
for (const likeCounterBtn of likeBtnAll) {
    likeCounterBtn.setAttribute('class', 'like-button-heart')
    likeCounterBtn.setAttribute('id', review.id)
    likeCounterBtn.innerText = "&#2665; LIKES"
    likeCounterBtn.addEventListener('click', (e) => {
        console.log(e.target.dataset);
        likes(e)
        incrementBtn(e)
    })
}



function incrementBtn(e) {
//     let num = parseInt(e.target.innerText)
//     let num2 = num + 1;
//     e.target.innerText = num2;
// }


// function likes(e) {
    // e.preventDefault()
    let more = parseInt(e.target.innerText) + 1

    fetch(`http://localhost:3000/reviews/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "likes": more
        })
    })
        .then(res => res.json())
        .then((like_obj => {
            e.target.previousElementSibling.innerText = `${more} likes`;
        }))
}