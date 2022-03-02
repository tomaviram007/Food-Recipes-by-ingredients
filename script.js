const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");

// event listeners
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener("click", () => {
  mealDetailsContent.parentElement.classList.remove("showRecipe");
});

// get meal list that matches with the ingredients

function getMealList() {
  let searchInputTxt = document.getElementById("search-input").value.trim();
  console.log(searchInputTxt);
  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`
  )
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
            <div class="meal-item" data-id =${meal.idMeal}>
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="food">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="recipe-btn">Get Recipe</a>
                        </div>
                    </div>`;
        });
        mealList.classList.remove("notFound");
      } else {
        html = "Sorry, We Didn't Find Any Meal!";
        mealList.classList.add("notFound");
      }
      mealList.innerHTML = html;
    });
}

// get recipe of the meal
function getMealRecipe(e) {
  console.log("inside getMealRecipe");
  e.preventDefault();

  if (e.target.classList.contains("recipe-btn")) {
    console.log("recipe-btn");
    let mealItem = e.target.parentElement.parentElement;
    console.log(mealItem.dataset.id);
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => mealRecipeModel(data.meals));
  }
}

//create a model
function mealRecipeModel(meal) {
  console.log(meal);
  meal = meal[0];
  let html = `
  <img src="${meal.strMealThumb}" alt="chips" class="smallImg">
  <br>
  <h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">Category: ${meal.strCategory}</p>
  <div class="recipe-instruct"><br/>
    <h3 class="instructions">Instructions:</h3>
        <p>${meal.strInstructions}</p>
  </div>
  <div class="recipe-meal-img">
      <img src="${meal.strMealThumb}" alt="chips" class="img">
  </div>
  <div class="recipe-link">
      <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
  </div>

`;

  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add('showRecipe');
}
