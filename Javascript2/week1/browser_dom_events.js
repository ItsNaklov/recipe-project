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
