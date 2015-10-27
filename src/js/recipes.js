'use strict';


var SERVER_URI = 'http://localhost:8080/';
var RECIPES_PER_PAGE = 10;

var currentPage;
var activeFilter;
var maxPages;

// Mock authentication was already performed
var currentUser = {
    id: 1,
    name: 'Joe'
};

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
        var id = recipe.id;
        var ingredients = recipe.ingredients.map(function (ingredient) {
           return ingredient.name;
        });
        var ingredientText = ingredients.join(', ');
        var cookingTimeText = recipe.cookingTime.measure + ' ' + recipe.cookingTime.units;

        // Basic recipe data
        var recipeElement = jQuery('<div class="recipe" id="recipe-' + id + '"></div>');
        recipeElement.append('<div class="recipes-list__name">' + recipe.name + '</div>');
        recipeElement.append('<div class="recipes-list__cooking-time">' + cookingTimeText + '</div>');
        recipeElement.append('<div class="recipes-list__ingredients">' + ingredientText + '</div>');

        // Whether the recipe is or not starred by the user
        var isStarred = isStarredByCurrentUser(recipe);
        recipeElement.append(createStarredElementHTML(id, isStarred));

        // Link to open the recipe in the details page
        var openRecipeLink = jQuery('<a class="recipes-list__link" href="recipe.html?id=' + id + '">Details➤</a>');
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

function createStarredElementHTML(id, isStarred) {
    if (isStarred) {
        return '<div class="recipes-list__starred" onclick="setStarredRecipe(' + id + ', false)">★</div>';
    } else {
        return '<div class="recipes-list__unstarred" onclick="setStarredRecipe(' + id + ', true)">☆</div>';
    }
}

function isStarredByCurrentUser(recipe) {
    var starredBy = recipe.starredBy;
    if (!starredBy) {
        return false;
    }
    return starredBy.indexOf(currentUser.id) !== -1;
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

function setStarredRecipe(id, doStar) {
    jQuery.ajax({
        url: SERVER_URI + 'recipes/' + id + (doStar ? '/star' : '/unstar') + '?userId=' + currentUser.id,
        contentType: 'text/plain',
        type: 'PUT',
        success: function () {
            return updateStarredRecipeStatus(id, doStar);
        }
    });
}

function updateStarredRecipeStatus(id, doStar) {
    var recipeContainer = jQuery('#recipe-' + id);
    // Remove the previous element with the old status
    if (doStar) {
        jQuery(recipeContainer).find('.recipes-list__unstarred').remove();
    } else {
        jQuery(recipeContainer).find('.recipes-list__starred').remove();
    }
    // Add the new element with the old status
    recipeContainer.append(createStarredElementHTML(id, doStar));
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


