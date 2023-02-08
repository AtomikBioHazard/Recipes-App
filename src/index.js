const d = document,
  mealsEl = d.getElementById('meals'),
  favoriteContainer = d.getElementById('fav-meals'),
  mealPopup = d.getElementById('meal-popup'),
  mealInfoEl = d.getElementById('meal-info'),
  popupCloseBtn = d.getElementById('close-popup'),
  searchTerm = d.getElementById('search-term'),
  searchBtn = d.getElementById('search');

getMeal();
fetchFavMeals();

// Function to fetch a meal by ID or a term search or random
async function getMeal(id, term = '') {
  const endpoint = id
    ? `lookup.php?i=${id}`
    : term
    ? `search.php?s=${term}`
    : 'random.php';

  // console.log(endpoint);

  // Fetch the meal from the API and handle errors
  const resp = await fetch(
    `https://www.themealdb.com/api/json/v1/1/${endpoint}`
  );
  // console.log(resp);

  try {
    const respData = await resp.json();
    // console.log(respData);
    // console.log(endpoint.match(term) ? 'yes' : 'no');
    const meal = respData;
    return endpoint.match('random.php')
      ? addMeal(meal.meals[0])
      : endpoint.match(term)
      ? meal.meals
      : meal.meals[0];
  } catch (error) {
    console.error(error);
  }
}

// Debounce function to prevent excessive API calls
function debounce(fn, delay) {
  let timer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

// Function to add a meal to the meals container
function addMeal(mealData) {
  // console.log(mealData);
  // Create mel element and add the meal data
  const meal = d.createElement('div');
  meal.classList.add('meal');

  meal.innerHTML = `
    <div class="meal-header">
      <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" />
    </div>
    <div class="meal-body">
      <h4>${mealData.strMeal}</h4>
      <button class="fav-btn">
        <i class="fas fa-heart"></i>
      </button>
    </div>
  `;

  // Add event listener for the favorite button and the meal
  const btn = meal.querySelector('.meal-body .fav-btn');

  btn.addEventListener('click', debounce(() => {
    btn.classList.toggle("active");
    btn.classList.contains('active')
      ? removeMealLS(mealData.idMeal)
      : addMealLS(mealData.idMeal)
    fetchFavMeals();
  }, 500));

  meal.addEventListener('click', () => showMealInfo(mealData));
  mealsEl.appendChild(meal);
}

// Function to add a meal to the favorite meals container
function addMealFav(mealData) {
  // Create favorite meal element and add the meal data
  const favMeal = d.createElement('li');

  favMeal.innerHTML = `
    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" />
    <span>${mealData.strMeal}</span>
    <button class="clear"><i class="fas fa-window-close"></i></button>
  `;

  // Add an event listener for the remove button
  favMeal.querySelector('.clear').addEventListener('click', () => {
    removeMealLS(mealData.idMeal);
    fetchFavMeals();
  })

  favMeal.addEventListener('click', () => showMealInfo(mealData));
  favoriteContainer.appendChild(favMeal);
}

// Function to get the meal ids from the local storage
function getMealsLS() {
  const mealIds = JSON.parse(localStorage.getItem('mealIds'));
  return mealIds || [];
}

// Function to add a meal to the local storage
const addMealLS = mealId => {
  const mealIds = getMealsLS();
  localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
}

// Function to remove a meal from the local storage
const removeMealLS = mealId => {
  const mealIds = getMealsLS();
  localStorage.setItem('mealIds', JSON.stringify(mealIds.filter(id => id !== mealId)));
}

// Function to fetch and add the favorite meals to the container
async function fetchFavMeals() {
  // Clear the container
  favoriteContainer.innerHTML = '';

  const mealIds = getMealsLS();

  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];
    const meal = await getMeal(mealId);
    addMealFav(meal);
  }
}

// Function to show the meal info in the meal popup
function showMealInfo(mealData) {
  // clean it up
  mealInfoEl.innerHTML = '';

  // update the Meal info
  const mealEl = document.createElement('div');

  const ingredients = [];

  // get ingredients and measures
  for (let i = 1; i <= 20; i++) {
    if (mealData['strIngredient' + i]) {
      ingredients.push(
        `${mealData['strIngredient' + i]} - ${mealData['strMeasure' + i]}`
      );
    } else {
      break;
    }
  }

  mealEl.innerHTML = `
        <h1>${mealData.strMeal}</h1>
        <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
        />
        <p>
        ${mealData.strInstructions}
        </p>
        <h3>Ingredients:</h3>
        <ul>
            ${ingredients
      .map(
        (ing) => `
            <li>${ing}</li>
            `
      )
      .join('')}
        </ul>
    `;

  mealInfoEl.appendChild(mealEl);

  // show the popup
  mealPopup.classList.remove('hidden');
}

searchBtn.addEventListener("click", async () => {
  // clean container
  mealsEl.innerHTML = "";

  const search = searchTerm.value;
  const meals = await getMeal(null, search);

  if (meals) {
    meals.forEach((meal) => {
      addMeal(meal);
    });
  }
});

popupCloseBtn.addEventListener('click', () => {
  mealPopup.classList.add('hidden');
});
