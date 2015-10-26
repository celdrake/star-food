'use strict';


var recipesDB = [
    {
        'id': 1,
        'name': 'Lemon Chicken',
        'cooking_time': {
            'measure': 30,
            'units': 'minutes'
        },
        'ingredients': [
            {
                'name': 'Chicken'
            },
            {
                'name': 'Lemon'
            },
            {
                'name': 'Thyme'
            }
        ]
    }
];
var usersDB = [];
var starredRecipes = [];

var DB = {
    'users': usersDB,
    'starredRecipes': starredRecipes,
    'recipes': recipesDB
};

module.exports = {
    database: DB
};
