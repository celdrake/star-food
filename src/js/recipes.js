'use strict';


var SERVER_URI = 'http://localhost:8080/';
var RECIPES_PER_PAGE = 10;

var currentPage;
var activeFilter;
var maxPages;

function initialiseRecipeList() {
    currentPage = 0;
    activeFilter = null;
    loadBBCRecipes();
}

function loadBBCRecipes() {
    var recipesContent = '';
    jQuery.get(buildGetRecipesUrl(), function onSuccess(response) {
        recipesContent = generateRecipeList(response);
    }).fail(function(err) {
        recipesContent = jQuery('<div class="recipe recipe-error">' + err.responseText+ '</div>');
    }).always(function () {
        populateRecipeList(recipesContent);
    });
}

function buildGetRecipesUrl() {
    var url = SERVER_URI + 'recipes?';
    if (activeFilter === null) {
        // When not filtering, we can query the current page
        url += 'page=' + currentPage;
    } else {
        // When filtering, we always perform the filter on the full list, not for the current page
        url += activeFilter.name + '=' + activeFilter.value;
        if (activeFilter.name === 'maxCookingTime') {
            url += '&units=' + jQuery('#filter-cookingTimeUnits').find('option:selected').val(); // Selected units
        }
    }
    return url;
}

function generateRecipeList(response) {
    var totalRecipes = response.totalResults;
    var recipeElems = [];
    response.recipes.forEach(function (recipe, idx) {
        var ingredients = recipe.ingredients.map(function (ingredient) {
           return ingredient.name;
        });
        var ingredientText = ingredients.join(', ');
        var cookingTimeText = recipe.cookingTime.measure + ' ' + recipe.cookingTime.units;

        // Basic recipe data
        var recipeElement = jQuery('<div class="recipe"></div>');
        recipeElement.append('<div class="recipes-list__name">' + recipe.name + '</div>');
        recipeElement.append('<div class="recipes-list__cooking-time">' + cookingTimeText + '</div>');
        recipeElement.append('<div class="recipes-list__ingredients">' + ingredientText + '</div>');

        // Link to open the recipe in the details page
        var openRecipeLink = jQuery('<a class="recipes-list__link" href="recipe.html?id=' + recipe.id + '">Details➤</a>');
        recipeElement.append(openRecipeLink);

        // Applying zebra-like styles (odd and even colors)
        if (idx % 2 === 1) {
            recipeElement.addClass('recipe--odd');
        }
        // Add the new row to the list
        recipeElems.push(recipeElement);
    });
    drawPagination(totalRecipes);
    return recipeElems;
}

function nextPage() {
    // Ensure limits are not surpassed
    if (currentPage < maxPages - 1) {
        currentPage++;
        loadBBCRecipes();
    }
}

function previousPage() {
    // Ensure limits are not surpassed
    if (currentPage > 0) {
        currentPage--;
        loadBBCRecipes();
    }
}

function drawPagination(totalRecipes) {
    maxPages = Math.ceil(totalRecipes / RECIPES_PER_PAGE);
    // Disable Next/Previous arrows when current page is in either of the limits (or both if only 1 page)
    var paginationArrows = jQuery('#recipes-pagination').find('.pagination__arrow');
    jQuery(paginationArrows[0]).toggleClass('pagination__arrow--disabled', currentPage === 0);
    jQuery(paginationArrows[1]).toggleClass('pagination__arrow--disabled', currentPage === maxPages - 1);

    // Update total pages
    jQuery('#pagination-page').html('Page ' + (currentPage + 1) + ' / ' + maxPages);
}

function populateRecipeList(data) {
    var recipesList = jQuery('#recipes-list');
    // Remove all rows except the header, which does not have the class "recipe"
    recipesList.find('.recipe').remove();
    // Add the recipe rows
    recipesList.append(data);
}

function filterRecipes() {
    activeFilter = null;
    jQuery('.filter-box').each(function (idx, filter) {
        // Only one filter can have a value at any given moment, find if there is an active one
        if (filter.value !== '') {
            activeFilter = {
                name: filter.id.substr('filter-'.length), // Remove the 'filter-' prefix
                value: filter.value
            };
        }
    });
    loadBBCRecipes();
}

function onFilterSelected(updatedFilter) {
    // When a filter input box is focused, the rest is cleared (only one filter can be performed on the query)
    jQuery('.filter-box').each(function (idx, filter) {
       if (filter !== updatedFilter) {
           filter.value = '';
       }
    });
}

initialiseRecipeList();


