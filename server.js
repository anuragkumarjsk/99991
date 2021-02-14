const express = require('express')
const app= express();
const port = process.env.PORT || 4000;
const path =require('path');
var cors = require("cors");
const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const  mongoose  = require('mongoose');
const uri = "mongodb+srv://user1:password@572103@cluster0.gs6mn.mongodb.net/B-Kisan?retryWrites=true&w=majority" 

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB Connected…')
})
.catch(err => console.log(err))

const order_routes = require('./routes/routes');
const user_routes = require('./routes/user_routes');

app.set("views", path.join(__dirname,"views"));
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use('/',order_routes);
app.use('/',user_routes)

app.get('/',function(req,res){
    res.send('Test successful');
});


app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port,function(){
    console.log('server started on '+port);
})