router = require('express').Router();
const User = require('../models/User')

const passport = require('passport')

router.get('/users/signin', function(req, res) {
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate("local",{
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', function(req, res) {
    res.render('users/signup');
});



router.post('/users/signup', async (req, res) => {
    const errors = [];
    const {name, email, password, confirm_password} = req.body;
    //console.log(req.body);
    if (name.trim().length <= 0) {
        errors.push({text: 'Please insert name'});
    }
    if (confirm_password != password) {
        console.log(password);
        console.log(confirm_password);
        console.log(typeof(password));
        console.log(typeof(confirm_password));
        errors.push({text: 'Passwords do not match'});
    };
    if (password.length < 4) {
        errors.push({text: 'Password length should be at least 4 characters'})
    };
    if (errors.length > 0) {
        //console.log(errors);
        res.render('users/signup', {errors, name, email, password, confirm_password});  
    } else {
        const emailUser = await User.findOne({email:email})
        if (emailUser) {
            req.flash('error_msg', 'The email is already in use');
            res.redirect('/users/signup');
        } else {
            const newUser = await new User({name,email, password});
            //console.log(newUser);
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save()
            req.flash('success_msg', 'You are registered');
            res.redirect('/users/signin');
        }
        
    }
    
});

router.get('/users/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})
module.exports = router;