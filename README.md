# Recipe App Documentation

A single-page application for searching for and displaying information about recipes. The data for the recipes is fetched from an API. The user can also save their favorite recipes to view later.

## HTML

The HTML consists of a header section that includes a search input and search button, a main section that displays the recipes and a favorite meals section, and a popup section that displays detailed information about a selected recipe.

### Header

The header section has a search input and search button. The search input is identified by the id attribute with the value of `search-term`. The search button has an id attribute with the value of `search`.

### Main

The main section is divided into two sections. The first section displays the favorite meals and has an id of `fav-meals`. The second section displays the recipes and has an id of `meals`.

### Popup

The popup section is used to display detailed information about a selected recipe. The section is hidden by default and has an id of `meal-popup`. The close button for the popup is identified by the id of `close-popup`. The detailed information about the recipe is displayed in a div with an id of `meal-info`.

## JavaScript

The JavaScript code fetches recipe information from an API and displays it on the page. The code also allows the user to save their favorite recipes and view them later.

### Constants

The following constants are used to reference HTML elements in the JavaScript code:

-   `mealsEl`: A reference to the `meals` element that displays the recipes.
-   `favoriteContainer`: A reference to the `fav-meals` element that displays the favorite meals.
-   `mealPopup`: A reference to the `meal-popup` element that displays the detailed information about a selected recipe.
-   `mealInfoEl`: A reference to the `meal-info` element that displays the detailed information about a selected recipe.
-   `popupCloseBtn`: A reference to the `close-popup` button used to close the detailed information about a selected recipe.
-   `searchTerm`: A reference to the `search-term` input used to search for recipes.
-   `searchBtn`: A reference to the `search` button used to initiate a recipe search.

### Functions

The following functions are used in the JavaScript code:

-   `getMeal`: A function that fetches a meal by ID or a random meal by searching with a term.
-   `debounce`: A debouncing function that prevents excessive API calls.
-   `addMeal`: A function that adds a meal to the meals container.
-   `addMealFav`: A function that adds a meal to the favorite meals container.
-   `removeMealLS`: A function that removes a meal from local storage.
-   `fetchFavMeals`: A function that fetches the favorite meals from local storage and adds them to the favorite meals container.
-   `showMealInfo`: A function that shows detailed information about a selected recipe.
-   `searchMeal`: A function that searches for recipes based on the input in the search term input.

**Note**: The code uses Font Awesome icons and assumes that the Font Awesome CSS is included in the project. The code also assumes that the API is available and that all API calls are successful.