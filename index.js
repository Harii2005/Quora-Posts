const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

app.use(express.urlencoded({extended : true}));

app.set("view engine" , "ejs");//to create template in view folder
app.set("views", path.join(__dirname, "views"));//this is used so that it will execute even in parent folder
app.set(express.static(path.join(__dirname , "public")));//this is used to link CSS HTML files



app.listen(port , ()=>{
    console.log(`listening to ${port}`);
});



app.get("/" , (req , res)=>{
    res.send("Server is woking well......");
});


let posts = [
    {
        id       : uuidv4(),
        username : "Harikrishnan",
        content  : "i am a  Btech CSE student",

    },
    {
        id       : uuidv4(),
        username : "Ravishankar",
        content  : "i am a Btech ECE student",
    },
    {
        id       : uuidv4(),
        username : "Bindu K A",
        content  : "I am SDE in BSNL ",
    },
];


app.get("/posts" , (req , res)=>{
    res.render("index.ejs" , {posts});
});
app.get("/posts/new" , (req , res)=>{
    res.render("new.ejs");
});
app.get("/posts/:id" , (req , res)=>{
    let {id} = req.params;
    let singlepost = posts.find((p) => id === p.id);
    console.log(singlepost);
    res.render("show.ejs",{id , singlepost});
});

app.post("/posts" , (req , res) => {
    console.log(req.body);
    let id = uuidv4();
    let { username, content } = req.body;
    posts.push({ id,username, content }); 
    res.redirect("/posts");
});

app.patch("/posts/:id" , (req , res)=>{
    let {id} = req.params;
    let newcontent = req.body.content;
    let singlepost = posts.find((p) => id === p.id);
    singlepost.content = newcontent;
    console.log(singlepost);
    res.redirect("/posts");
});

app.get("/posts/:id/edit" , (req , res) => {
    let {id} = req.params;
    let singlepost = posts.find((p) => id === p.id);
    res.render("edit.ejs",{singlepost});
});

