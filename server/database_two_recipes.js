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
    },
    {
        'id': 2,
        'name': 'Basic Burger',
        'cooking_time': {
            'measure': 7,
            'units': 'minutes'
        },
        'ingredients': [
            {
                'name': 'Burger'
            },
            {
                'name': 'Bun'
            },
            {
                'name': 'Lettuce'
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
