const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const app = express()
const port =3020

app.use(express.static('public'))
app.use('/css',express.static(__dirname + 'public/css'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))


// Set views
// app.set('views','/views')
// app.set('view engine','ejs')


app.get('', (req, res) => {
    res.render({
        "Allow-access-Allow-origin": '*'
    })
    return res.sendFile('index')
})

// app.get('/signup_success',(req,res)=>
// {
//     res.render('signup_success')
// })

mongoose.connect('mongodb+srv://jitender9293:8221076979Jj@cluster0.ehaq9.mongodb.net/mydb?retryWrites=true&w=majority',
{
    useNewUrlParser:true,
    useUnifiedTopoLogy:true
})


var db =mongoose.connection;
db.on('error',()=>console.log("Error in Connection to mongo"));
db.once('open',()=>console.log('Connected to Database'));


app.post("/sign_up",(req,res)=>{
    var name=req.body.name;
    var email=req.body.email;
    var phon=req.body.phon;
    var massage=req.body.massage;

    var data={
        "name":name,
        "email":email,
        "phon":phon,
        "massage":massage
    }
        db.collection('users').insertOne(data,(err,collection)=>{
            if(err){
                throw err;
            }
            console.log("Record Inserted Successfully");
        });

        return res.redirect('signup_success.html')
})




// Listen on port 
app.listen(port,()=>
console.log(`Listning on port ${port}`)
);
