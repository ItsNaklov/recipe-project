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

const frenchRecipes = [
  new Recipe(
    1001,
    "Boeuf Bourguignon (Beef Burgundy)",
    "A hearty beef stew cooked in red wine, vegetables, and herbs.",
    [
      "Beef",
      "Red wine (Burgundy is traditionally used)",
      "Pearl onions",
      "Mushrooms",
      "Carrots",
      "Garlic",
      "Thyme",
      "Bay leaf",
      "Beef broth",
      "Butter",
      "Olive oil",
      "Salt",
      "Pepper",
    ],
    "https://www.telegraph.co.uk/content/dam/recipes/2021/01/05/beef-soup_trans_NvBQzQNjv4Bq_nNpUE6IaHI6R9FXzzuwlx_fMl3rEm0l9EtNXQnfBIo.png" // Image URL for Boeuf Bourguignon
  ),
  new Recipe(
    1002,
    "Ratatouille",
    "A vegetable stew from Provence, France. Traditionally made with eggplant, zucchini, tomatoes, peppers, onions, and garlic.",
    [
      "Eggplant",
      "Zucchini",
      "Tomatoes",
      "Peppers",
      "Onions",
      "Garlic",
      "Olive oil",
      "Herbs (such as thyme, basil, and bay leaf)",
      "Salt",
      "Pepper",
    ],
    "https://www.sprinklesandsprouts.com/wp-content/uploads/2022/04/RatatouilleSQ.jpg" // Image URL for Ratatouille
  ),
  new Recipe(
    1003,
    "Soupe à l'Oignon Gratinée (French Onion Soup)",
    "A rich and flavorful soup made with caramelized onions, beef broth, and croutons, topped with melted cheese.",
    [
      "Onions (usually yellow onions)",
      "Beef broth",
      "Red wine (optional)",
      "Butter",
      "Olive oil",
      "Flour",
      "Thyme",
      "Bay leaf",
      "Salt",
      "Pepper",
      "Baguette",
      "Gruyère cheese",
    ],
    "https://www.fifteenspatulas.com/wp-content/uploads/2011/10/French-Onion-Soup-Fifteen-Spatulas-12.jpg" // Image URL for French Onion Soup
  ),

  new Recipe(
    1004,
    "Quiche Lorraine",
    "A savory tart with a flaky crust, filled with eggs, cheese, and bacon (can be made vegetarian by omitting bacon).",
    [
      "Flour",
      "Butter",
      "Eggs",
      "Heavy cream",
      "Cheese (Gruyère or Emmental)",
      "Bacon (optional)",
      "Onions",
      "Nutmeg",
      "Salt",
      "Pepper",
    ],
    "https://img.taste.com.au/yzM49jFu/taste/2017/02/classic-quiche-lorraine-121391-2.jpg" // Image URL for Quiche Lorraine
  ),

  new Recipe(
    1005,
    "Crêpes",
    "French pancakes made from flour, eggs, and milk. Can be enjoyed savory or sweet with various fillings.",
    ["Flour", "Eggs", "Milk", "Water", "Butter", "Salt", "Sugar (optional)"],
    "https://www.sweetashoney.co/wp-content/uploads/French-Crepe-Recipe-1.jpg" // Image URL for Crêpes
  ),
];
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
displayRecipes(frenchRecipes);
document
  .getElementById("recipeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
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
    displayRecipe(newRecipe);

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
  document.getElementById("recipeTitle").textContent = recipe.name;
  document.getElementById("recipeDescription").textContent = recipe.description;
  document.getElementById("recipeImage").src = recipe.pictureUrl;
  document.getElementById("recipeImage").alt = recipe.name;

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
