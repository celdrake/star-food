'use strict';


var SERVER_URI = 'http://localhost:8080/';
var RECIPES_PER_PAGE = 10;

var currentPage;
var maxPages;

function initialiseRecipeList() {
    currentPage = 0;
    loadBBCRecipes();
}

function loadBBCRecipes() {
    var recipesResponse = '';
    jQuery.get(SERVER_URI + 'recipes?page=' + currentPage, function onSuccess(response) {
        recipesResponse = generateRecipeList(response);
    }).fail(function(err) {
        recipesResponse = err.responseText;
    }).always(function () {
        populateRecipeList(recipesResponse);
    });
}

function generateRecipeList(response) {
    var totalRecipes = response.totalResults;
    if (totalRecipes === 1) {
        // TODO should list the recipe in the current page!!!
        window.location.href = 'recipe.html?id=' + recipes[0].id;
        return;
    }
    var recipeElems = [];
    response.recipes.forEach(function (recipe, idx) {
        var attrId = 'recipe-' + recipe.id;
        var a = '<a class="recipe__link" href="recipe.html?id=' + recipe.id + '">' + 'View Details ➤' + '</a>';
        var name = '<span class="recipe__name">' + recipe.name + '</span>';
        var clazz = 'recipe';
        if (idx % 2 === 0) {
            clazz += ' recipe--odd';
        }
        var elem = jQuery('<div class="' + clazz + '" data-id="' + attrId + '"></div>')
            .append(name).append(a);
        recipeElems.push(elem);
    });
    drawPagination(totalRecipes);
    return recipeElems;
}

function nextPage() {
    // Ensure limits
    if (currentPage < maxPages - 1) {
        currentPage++;
        loadBBCRecipes();
    }
}

function previousPage() {
    // Ensure limits
    if (currentPage > 0) {
        currentPage--;
        loadBBCRecipes();
    }
}

function drawPagination(totalRecipes) {
    maxPages = Math.ceil(totalRecipes / RECIPES_PER_PAGE);
    var paginationArrows = jQuery('#recipes-pagination').find('.pagination__arrow');
    // Disable Next/Previous arrows when current page is in either of the limits (or both if only 1 page)
    jQuery(paginationArrows[0]).toggleClass('pagination__arrow--disabled', currentPage === 0);
    jQuery(paginationArrows[1]).toggleClass('pagination__arrow--disabled', currentPage === maxPages - 1);

    // Update total pages
    jQuery('#pagination-page').html('Page ' + (currentPage + 1) + ' / ' + maxPages);
}

function populateRecipeList(data) {
    jQuery('#recipes-list')
        .empty()
        .html(data);
}


initialiseRecipeList();


