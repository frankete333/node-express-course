const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const mockUserData=[
    { name:'Mark' },
    { name:'Jill' }
];

app.get('/users', function(req, res){
    res.json({
        success: true,
        message: 'successfully got users. Nice!',
        users: mockUserData
    })
});

app.get('/users/:id',function(req,res){
	console.log(req.params.id)
	res.json({
		success: true,
		message: 'got one user',
		user: req.params.id
	})
});

app.post('/login', function(req, res){
    const user = req.body.username;
    const pass = req.body.password;

    const TestUs = "billy"
    const TestPass = "1234"

    if (user === TestUs && pass === TestPass){
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