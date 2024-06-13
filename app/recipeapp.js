let recipeId = 1;
let currentRecipe = null;
class Recipe {
  constructor(id, name, description, ingredients, pictureUrl) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.ingredients = ingredients;
    this.pictureUrl = pictureUrl;
  }
}

frenchRecipes = [];
fetchedRecipes = [];
ingredientsPrices = {};

async function getData() {
  const response = await fetch(
    "https://raw.githubusercontent.com/ItsNaklov/itsnaklov.github.io/main/recipe.json"
  );
  const data = await response.json();
  console.log(data);
  fetchedRecipes = data["recipes"];
  ingredientsPrices = data["ingredientsPrices"];
  fetchedRecipes.forEach((recipie) => {
    // id, name, description, ingredients, pictureUrl
    frenchRecipes.push(
      new Recipe(
        recipie.id,
        recipie.name,
        recipie.description,
        recipie.ingredients,
        recipie.pictureUrl
      )
    );
  });

  displayRecipes(frenchRecipes);
  return data;
}

// Function to find recipe by search word
function findRecipeBySearch() {
  const searchInput = document.getElementById("search-input");
  const searchText = searchInput.value.toLowerCase().trim();

  if (!searchText) {
    return [];
  }

  const searchedRecipes = frenchRecipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchText)
  );

  return searchedRecipes;
}

// Function to sort recipes by ingredient count
function sortByIngredientCount(ascending = true) {
  return frenchRecipes.sort((recipe1, recipe2) => {
    const ingredientCount1 = recipe1.ingredients.length;
    const ingredientCount2 = recipe2.ingredients.length;
    if (ascending) {
      return ingredientCount1 - ingredientCount2;
    } else {
      return ingredientCount2 - ingredientCount1;
    }
  });
}
const sortIngredientsButton = document.getElementById(
  "sort-ingredients-button"
);
sortIngredientsButton.addEventListener("click", () => {
  const sortedRecipes = sortByIngredientCount(false);
  displayRecipes(sortedRecipes);
});

const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", () => {
  const searchedRecipe = findRecipeBySearch();
  displayRecipes(searchedRecipe);
});

console.log(frenchRecipes);
function displayRecipes(recipesToDisplay) {
  const grid = document.getElementById("recipe-grid");
  grid.innerHTML = "";
  recipesToDisplay.forEach((recipe) => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
          <h3>${recipe.name}</h3>
          <p>Ingredients: ${recipe.ingredients.join(", ")}</p>
          <img src="${recipe.pictureUrl}" width="400" height="400"></img>
      `;
    grid.appendChild(card);
  });
}

// Initial display
document
  .getElementById("recipeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const pictureUrl = document.getElementById("pictureUrl").value;
    const ingredients = document.querySelectorAll(
      '#ingredients input[name="ingredient"]'
    );

    if (ingredients.length < 5) {
      alert("Please add at least 5 ingredients.");
      return;
    }

    const ingredientList = [];
    ingredients.forEach((ingredient) => ingredientList.push(ingredient.value));

    const newRecipe = new Recipe(
      recipeId++,
      title,
      description,
      ingredientList,
      pictureUrl
    );
    frenchRecipes.push(newRecipe);
    console.log(`noProblem`);
    displayRecipes(frenchRecipes);
    document.getElementById("recipeForm").reset();
    document.getElementById("ingredients").innerHTML = `
    <div class="ingredient-item">
      <input type="text" name="ingredient" placeholder="Ingredient" required />
      <button type="button" onclick="addIngredient()">Add Ingredient</button>
    </div>
  `;
  });

function displayRecipe(recipe) {
  currentRecipe = recipe;
  document.getElementById("title").textContent = recipe.title;
  document.getElementById("description").textContent = recipe.description;
  document.getElementById("image").src = recipe.pictureUrl;
  document.getElementById("image").alt = recipe.title;

  const ingredientListElement = document.getElementById("ingredientList");
  ingredientListElement.innerHTML = "";
  recipe.ingredients.forEach((ingredient) => {
    const li = document.createElement("li");
    li.className = "ingredient";
    li.textContent = ingredient;
    ingredientListElement.appendChild(li);
  });
}

function addIngredient() {
  const ingredientList = document.getElementById("ingredients");
  const ingredientItem = document.createElement("div");
  ingredientItem.className = "ingredient-item";
  ingredientItem.innerHTML = `
    <input type="text" name="ingredient" placeholder="Ingredient" required />
    <button type="button" onclick="removeIngredient(this)">Remove</button>
  `;
  ingredientList.appendChild(ingredientItem);
}

function removeIngredient(button) {
  button.parentElement.remove();
}

function addNewIngredient() {
  const newIngredientInput = document.getElementById("newIngredient");
  const newIngredient = newIngredientInput.value.trim();

  if (newIngredient === "") {
    alert("Ingredient cannot be empty.");
    return;
  }

  if (currentRecipe) {
    currentRecipe.ingredients.push(newIngredient);
    displayRecipe(currentRecipe);
    newIngredientInput.value = "";
  } else {
    alert("No recipe is currently displayed.");
  }
}
// Cooking Timer
const timerButton = document.getElementById("start-timer-button");
timerButton.addEventListener("click", () => {
  const timerInput = document.getElementById("timer-input").value;
  startCookingTimer(parseInt(timerInput));
});

function startCookingTimer(duration) {
  let timer = duration,
    minutes,
    seconds;
  const timerDisplay = document.getElementById("timer-display");
  const intervalId = setInterval(() => {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timerDisplay.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      clearInterval(intervalId);
      alert("Time's up!");
    }
  }, 1000);
}

// Page Visit Timer
const startTime = Date.now();

function updateTime() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);

  const hours = Math.floor(elapsed / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((elapsed % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (elapsed % 60).toString().padStart(2, "0");

  document.getElementById(
    "page-timer"
  ).textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateTime, 1000);

function fetchIngredientPrice(ingredient) {
  console.log(typeof ingredient);
  const keys = Object.keys(ingredientsPrices);

  if (keys.includes(ingredient)) {
    return `<p>Price of ${ingredient}: $${ingredientsPrices[ingredient]}</p>`;
  } else {
    return `<p>${ingredient} not found</p>`;
  }
}

const ingredientSearchButton = document.getElementById(
  "ingredient-search-button"
);
if (ingredientSearchButton) {
  ingredientSearchButton.addEventListener("click", async () => {
    const ingredientInput = document.getElementById("ingredient-search-input");
    const resultsDiv = document.getElementById("ingredient-price-result");
    if (!ingredientInput || !resultsDiv) {
      console.error("Ingredient input or result div not found.");
      return;
    }

    const ingredient = ingredientInput.value.toLowerCase().trim();
    if (!ingredient) {
      resultsDiv.innerHTML = "<p>Please enter an ingredient.</p>";
      return;
    }

    try {
      const result = await fetchIngredientPrice(ingredient);
      resultsDiv.innerHTML = result;
    } catch (error) {
      resultsDiv.innerHTML = `<p>${error}</p>`;
    }
  });
} else {
  console.error("Ingredient search button not found.");
}
getData();
