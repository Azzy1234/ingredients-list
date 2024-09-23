document.getElementById('searchBtn').addEventListener('click', function() {
    const ingredient = document.getElementById('ingredient').value;
    getRecipes(ingredient);
});

function getRecipes(ingredient) {
    const apiKey = '714376f02f714f4bbe410f4849caf7a2';
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&number=5&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayRecipes(data);
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
        });
}

function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = ''; // Clears the previous results

    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');

        // Gets the missing ingredients
        const missedIngredients = recipe.missedIngredients.map(ingredient => ingredient.name).join(', ');
        const usedIngredients = recipe.usedIngredients.map(ingredient => ingredient.name).join(', ');

        recipeDiv.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}" />
            <h2>${recipe.title}</h2>
            <p><strong>Used ingredients:</strong> ${usedIngredients}</p>
            <p><strong>Missing ingredients:</strong> ${missedIngredients}</p>
        `;

        recipesContainer.appendChild(recipeDiv);
    });
}
