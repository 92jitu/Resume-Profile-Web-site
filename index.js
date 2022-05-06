var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var path =require('path')

const app = express()

app.use(express.static(path.join(__dirname,'public')))

app.use(bodyParser.json())
// app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))


mongoose.connect('mongodb://Localhost:27017/mydb',
{
    useNewUrlParser:true,
    useUnifiedTopoLogy:true
})

var db =mongoose.connection;
db.on('error',()=>console.log("Error in Connection to mongo"));
db.once('open',()=>console.log('Connected to Database'));


app.post("/signup_success",(req,res)=>{
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

        return res.redirect('signup_succes.html')
})



app.get("/*", (req, res) => {
    res.send({
        "Allow-access-Allow-origin": '*'
    })
    return res.redirect('index.html')
}).listen(5005);

console.log("Listning on port 5005")