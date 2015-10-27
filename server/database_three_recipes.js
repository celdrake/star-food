'use strict';

var recipesDB = [
    {
        'id': 1,
        'name': 'Lemon Chicken',
        'cookingTime': {
            'measure': 30,
            'units': 'minutes'
        },
        'ingredients': [
            {
                'name': 'Chicken',
                'quantity': 4
            },
            {
                'name': 'Thyme',
                'quantity': 1,
                'units': 'tsp'
            },
            {
                'name': 'Lemon',
                'quantity': 1
            }
        ],
        'image': 'recipes/lemon_chicken.jpg'
    },
    {
        'id': 2,
        'name': 'Beef Stroganoff',
        'cookingTime': {
            'measure': 30,
            'units': 'minutes'
        },
        'ingredients': [
            {
                'name': 'Beef'
            },
            {
                'name': 'Mustard'
            },
            {
                'name': 'Mushrooms'
            }
        ],
        'image': 'recipes/beef_stroganoff.jpg'
    },
    {
        'id': 3,
        'name': 'Chicken Caesar Salad',
        'cookingTime': {
            'measure': 25,
            'units': 'minutes'
        },
        'ingredients': [
            {
                'name': 'Lettuce'
            },
            {
                'name': 'Chicken'
            },
            {
                'name': 'Parmesan'
            }
        ],
        'image': 'recipes/caesar_salad.jpg'
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
