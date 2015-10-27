'use strict';


var SERVER_URI = 'http://localhost:8080/';

function initialiseRecipeDetails() {
    var id = getRecipeId();
    if (!id) {
        populateRecipeError('Sorry, this recipe doesn\'t exist or may have been removed');
        return;
    }
    jQuery.get(SERVER_URI + 'recipe/' + id, function onSuccess(recipeDetails) {
        populateRecipeFields(recipeDetails);
    }).fail(function(err) {
        // We display the server error directly (they are user friendly)
        populateRecipeError(err.responseText);
    });
}

function populateRecipeFields(recipe) {
    var ingredients = recipe.ingredients.map(function (ingredient) {
        // We will still display ingredients with no quantity neither units
        var text = ingredient.name;
        if (!!ingredient.quantity) {
            text += ': ' + ingredient.quantity;
        }
        if (!!ingredient.units) {
            text += ' ' + ingredient.units;
        }
        return text;
    });

    // Set the recipe's title
    var recipeContent = jQuery('#recipe-detail-content');
    recipeContent.find('.recipe-details__title').html(recipe.name);

    // Fill cooking time
    var infoElements = recipeContent.find('.tag__content--cooking');
    jQuery(infoElements[0]).html(recipe.cookingTime.measure + ' ' + recipe.cookingTime.units);

    // Create one element per ingredient
    var ingredientContainer = jQuery('#ingredient-container');
    ingredients.forEach(function (ingredientText) {
        if (ingredientText !== '') {
            ingredientContainer.append('<div class="tag__content--ingredient">' + ingredientText + '</div>');
        }
    });

    // Add the image url
    jQuery(recipeContent).find('.recipe__image')
        .attr('src', '../images/' + recipe.image)
        .show();

    // Make the element visible, once all is ready to be displayed
    recipeContent.find('#recipe-details').show();
}

function populateRecipeError(recipeName) {
    // Set title with an error style
    var recipeContent = jQuery('#recipe-detail-content');
    recipeContent.find('.recipe-details__title')
        .addClass('recipe-details__title--error')
        .html(recipeName);
}

function getRecipeId() {
    // Extracts the ID of the current image from the URL
    var pageUrl = decodeURIComponent(window.location.search.substring(1));
    var urlVariables = pageUrl.split('&');
    for (var i = 0; i < urlVariables.length; i++) {
        var parameterName = urlVariables[i].split('=');
        if (parameterName[0] === 'id') {
            return parameterName[1] === undefined ? true : parameterName[1];
        }
    }
    return undefined;
}

initialiseRecipeDetails();


