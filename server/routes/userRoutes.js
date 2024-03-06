const router = require('express').Router()
const User = require('../models/userModel')
const bcrypt = require('bcrypt')

router.post('/register', async (req,res) => {
    try {
        const user = req.body
        const userExists =  await User.findOne({email: user.email})

        if(userExists){
            res.send({
                success: false,
                message: 'User with this email already exists'
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(user.password, salt)

        const newUser = new User({...user, password : hashedPassword})
        newUser.save()
        res.send({
            success:true,
            message: 'User successfully registered.'
        })
    } catch (error) {
        console.log(error)
        res.send({
            success:false,
            message: 'Internal Server Error'
        })
    }
})

router.post('/login', async (req,res) => {
    const user = await User.findOne({email: req.body.email})
    if(!user){
        res.send({
            success : false,
            message : 'User does not exist'
        })
    }
    const isValidPassword = await bcrypt.compare(req.body.password, user.password)

    if(!isValidPassword){
        res.send({
            success : false,
            message : 'Incorrect password'
        })
    }

    return res.send({
        success:true,
        message: 'User logged in'
    })
})

exports.router = router
