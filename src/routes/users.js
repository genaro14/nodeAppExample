router = require('express').Router();

router.get('/users/signin', function(req, res) {
    res.render('users/signin');
});

router.get('/users/signup', function(req, res) {
    res.render('users/signup');
});

router.post('/users/signup', (req, res) => {
    const {name, email, password, password_confirm} = req.body;
    console.log(req.body);
    const errors = [];
    if (name.trim().length <= 0) {
        errors.push({text: 'Please insert name'});
    }
    if (password_confirm !== password) {
        errors.push({text: 'Passwords do not match'});
    };
    if (password.length < 4) {
        errors.push({text: 'Password length should be at least 4 characters'})
    };
    if (errors.length > 0) {
        console.log(errors);
        res.render('users/signup', {errors, name, email, password, password_confirm});  
    } else{
        res.send('ok');
    }
})


module.exports = router;