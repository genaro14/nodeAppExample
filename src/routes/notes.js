router = require('express').Router();
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const Note = require('../models/Note');

router.get('/notes/add', function(req, res) {
    res.render('notes/new-note');
});

router.post('/notes/add', async (req, res) => {
    console.log(req.body);
    const {title, description} = req.body;
    const errors = [];
    if (title.trim().length === 0) {
        errors.push({text: 'Insert title'});
    }
    if (description.trim().length === 0) {
        errors.push({text: 'Insert Description'});
    }
    if (errors.length > 0) {
        res.render('notes/new-note', { 
            errors, 
            title,
            description
        });
    } else {    
        const newNote = new Note({ title, description });
        console.log(newNote);
        await newNote.save();
        req.flash('success_msg', 'Note added succesfully')
        res.redirect('/notes');
    }
})

router.get('/notes', async (req, res) => {
    const notes = 
        await Note
        .find()
        .sort({date: 'desc'})
        .lean();
    res.render('notes/all-notes',{ notes });
    //res.send(notes);
})


router.get('/notes/edit/:id', async  (req, res) => {
    const note = await Note.findById(req.params.id).lean();
    
    res.render('notes/edit-note',{ note });
    //res.send(notes);
});

router.put('/notes/edit-note/:id', async  (req, res) => {
    const {title,description} = req.body;
    await Note.findByIdAndUpdate(req.params.id,{title,description} );
    req.flash('success_msg', 'Note edited succesfully'),
    res.redirect('/notes');
});

router.delete('/notes/delete/:id',async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);    
    console.log('Delete ID: ',req.params.id);
    req.flash('error_msg', 'Note Deleted'),

    res.redirect('/notes');
});

module.exports = router;