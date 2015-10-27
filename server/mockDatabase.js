'use strict';

// This module simulates an existing database.
// This has been done this to simplify the development and to make it easy to evaluate
// the different cases.

// Declarations for different database statuses from the requirement features
var emptyRecipeDB = require('./database_empty').database;
var oneRecipeDB = require('./database_one_recipe').database;
var sampleRecipesDB = require('./database_three_recipes').database;


/** Changing the uncommented line will set the current database status to the one in the selected module **/
//var currentDB = emptyRecipeDB;
//var currentDB = oneRecipeDB;
var currentDB = sampleRecipesDB;


// Mock functions that perform a query on the database
function mockQueryRecipes(callback) {
    return callback(null, currentDB['recipes']);
}

function mockQueryUsers(callback) {
    return callback(null, currentDB['users']);
}

function mockQueryStarredRecipes(callback) {
    return callback(null, currentDB['starredRecipes']);
}

// Mock function that performs a find by primary key on the Recipe table
function findRecipeById(id, callback) {
    var recipes = currentDB['recipes'];
    var recipe = null;
    recipes.forEach(function (recipeElem) {
        if (recipeElem.id === id) {
            recipe = recipeElem;
        }
    });
    return callback(null, recipe);
}

module.exports = {
    findRecipeById: findRecipeById,
    findAllRecipes: mockQueryRecipes,
    starredRecipes: mockQueryStarredRecipes,
    usersDB: mockQueryUsers
};
