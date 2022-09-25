const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const confi = require('./confi'); // comment this out when deploying to heroku

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){
    res.sendFile(`${__dirname}/signup.html`);
});

app.post('/', function(req, res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    
    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName, 
                } 
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = `https://us12.api.mailchimp.com/3.0/lists/${api2}`;
    const options = {
        method: 'POST',
        auth: `JohnnyProfits:${api}`,
    }

    const request = https.request(url, options, function(response){
        if (response.statusCode === 200) {
            res.sendFile(`${__dirname}/success.html`)
        } else {
            res.sendFile(`${__dirname}/failure.html`)
        }

        response.on('data', function(data){
            console.log(JSON.parse(data));
            console.log(`status code: ${response.statusCode}`);
        })
    })

    request.write(jsonData);
    request.end();
});

port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log(`Listening on port ${port}`);
})