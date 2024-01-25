const express = require('express')
const app =express()
const port = 3000
const fs = require('fs')
app.use(express.json());


app.post("/create", (req, res) => {
    const postData = req.body;

    // Log the postData to see its content
    console.log("data is", postData);

    if (postData) {
        // Convert postData to a JSON string
        const jsonData = JSON.stringify(postData, null, 2);

        // Write data to a file (e.g., data.json)
        fs.writeFile('products.json', jsonData, (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                console.log('Data stored successfully');
                res.status(201).send('Data stored successfully');
            }
        });
    } else {
        res.status(400).send('Bad Request: No data provided');
    }
});



app.listen(port, ()=>console.log('Server has started on', port))

