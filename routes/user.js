const express = require('express')
const dns = require('dns');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { User } = require('../models/user')
const Note = require('../models/notes')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
require('dotenv')


const router = express.Router();
router.use(bodyParser.json());
router.use(cookieParser());

function TokenVerify(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/home')
    }
    const key = "hello";
    jwt.verify(token, key, (err, decoded) => {
        if (err) {
            res.redirect('/home')
        }
        req.user = decoded;
        next();
    })
}

router.get('/', TokenVerify, (req, res) => {
    res.redirect('/myNotes')
})

router.get('/home', (req, res) => {
    res.render('home')
})


function validateEmailFormat(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateEmailDomain(email, callback) {
    const domain = email.split('@')[1];
    dns.resolveMx(domain, (err, addresses) => {
        if (err || addresses.length === 0) {
            callback(false);
        } else {
            callback(true);
        }
    });
}

router.get('/signup', (req, res) => {
    return res.render('signup',{message:''})
})

router.post('/signup', async(req, res) => {
    const email = req.body.email;

    if (!validateEmailFormat(email)) {
        return res.render('signup', { message: 'Invalid email format' });
    }

    validateEmailDomain(email, (isValidDomain) => {
        if (!isValidDomain) {
            return res.render('signup', { message: 'Invalid email domain' });
        }

    });

    const password = req.body.password
    if(password.length<8){
        return res.render('signup', { message: 'Minimum 8 digit password required' });
    }

    try {
        const result = await User.create({
            Email: email,
            Password: password
        });
        return res.render('login', { message: "Try Logging in" });
    } catch (err) {
        return res.render('signup', { message: 'Email already exists' });
    }
});

router.get('/login', (req, res) => {
    return res.render('login',{message:''})
})

router.post('/login', async(req, res) => {
    const alluser = await User.find({});
    const ruser = await alluser.find(user => (user.Email == req.body.email && user.Password == req.body.password))
    if (!ruser) {
        return res.render('login', { message: 'Incorrect Email or Password' })
    } else {
        const key = "hello";
        const token = jwt.sign({ username: ruser.Email, userid: ruser._id }, key, { expiresIn: '30d' })
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        return res.redirect('/myNotes')
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    res.redirect('/home')
})

router.get('/myNotes',TokenVerify,(req,res)=>{
    return res.render('myNotes')
})

router.get('/cnNote',TokenVerify,(req,res)=>{
    return res.render('cnNote')
})

router.post('/cnNote', TokenVerify, async (req, res) => {
    try {
        const name = req.user.username;
        const note = req.body.note;

        // Validate inputs
        if (!note) {
            return res.status(400).json({ error: "Note is required" });
        }

        // Create the note
        const Newnote = await Note.create({
            name: name,
            note: note,
        });

        res.status(201).json({ message: "Note saved successfully", note: Newnote });
    } catch (err) {
        if (err.code === 11000) {
            res.status(409).json({ error: "Duplicate entry detected" });
        } else {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        }
    }
});


module.exports = router