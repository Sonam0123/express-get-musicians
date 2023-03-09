// GOAL: Write an express route for POST /animals that updates the animal object with the content in the POST request body and returns the entire animal object.

// Create a POST route for the endpoint “/animals”

// Using the request body, add the new animal object to the array (new animal is sent as the request body)

// Return the animal array with the updated animal as a JSON response.

const express = require('express');

const app = express()

const animals = [
    {
        name: "Zebra",
        color: "Mixed"
    },
    {
        name: "Lion", 
        color: "Gold"
    },
    {
        name: "Tiger",
        color: "Orange"
    },
    {
        name: "Bear",
        color: "Brown"
    }
]


app.post('/animals', (req, res) => {
    animals.push(req.body)
    res.status(200).json(animals)
})
