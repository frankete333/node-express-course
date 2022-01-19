const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const users = new Map();

app.get('/users', function(req, res){
    const usersArr = new Array();
    for (let user of users.keys()){ // mejor manera de mandar todas las keys?
        usersArr.push(user);
    }
    res.json({
        success: true,
        message: 'successfully got users. Nice!',
        users: usersArr 
    })
});

app.get('/users/:id',function(req,res){
    const userData = users.get(req.params.id)
    if (userData){
        res.json({
            success: true,
            message: 'got the user',
            description: userData.desc
        })
    }else{
        res.json({
            success: false,
            message: 'user not found',
        })
    }
    
});

app.post('/signIn', function(req, res){
    const user = req.body.username;
    const userData = {
        pass: req.body.password,
        desc: req.body.description
    };
    if (users.get(user)){
        res.json({
            success: false,
            message: 'Usename already exist',
        });
    }else{
        users.set(user, userData);
        console.log(`User ${user} added to the system`)
        res.json({
            success: true,
            message: 'Succesfull sign in'
        });
    }

});

app.post('/login', function(req, res){
    const user = req.body.username;
    const pass = req.body.password;

    const userData = users.get(user);
    if (userData && userData.pass === pass){ // Capas que solo userData?.pass === pass funciona? border case con password undefined
        res.json({
            success: true,
            message: 'password and username matched :D',
            token: 'Token place holder'
        })
    }else{
        res.json({
            success: false,
            message: 'password and username dont matched D:'
        })
    }
});

app.listen(8000, function(){
    console.log("Server Is Running!");
})