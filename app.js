const path =require('path')
const express =require('express')
const app =express()
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
//middle wear 
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true,useUnifiedTopology: true});

const port = 8000

// define mongoose schema:its the way in which our data will be saved 
const contactSchema = new mongoose.Schema({
      
        Name:String,
        phone: String,
        email: String,
        Address: String,
        
      });
//creating a model like verifying tht this is our model 
var Contact= mongoose.model('Contact',contactSchema)

// express specific stuff 
app.use('/static',express.static('static'))
app.use(express.urlencoded())

// pug specific stuff
app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

// endpoints 
app.get('/',(req,res)=>{
       
        const params ={ }
        res.status(200).render('home.pug',params)


})
app.get('/contact',(req,res)=>{
       
        const params ={ }
        res.status(200).render('contact.pug',params)


})
app.post('/contact',(req,res)=>{
       
        var myData=new Contact(req.body)
        myData.save().then(()=>{
                res.send("this item has beeen saved to the database")

        }).catch(()=>{
                res.status(404).send("item was not saved to data base")
        })
        // res.status(200).render('contact.pug')


})



app.listen(port,()=>{
        console.log(`This application has started sucesfully on port ${port}`)
})