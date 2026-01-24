const express=require("express");
const app =express();
const port=3000;
const path=require("path");
const {v4:uuidv4}=require("uuid");



app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set("veiw engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));



let posts=[{
    id:uuidv4(),
    name:"rifat",
    content:"With hardships comes ease"

},{
     id:uuidv4(),
    name:"hasanul",
    content:"Work in silence"
},
{
     id:uuidv4(),
    name:"hamrif",
    content:"There is nothing nolble in getting better than your fellow men , true nobility comes from getting better than your former self"
}
]

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});



app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});


app.post("/posts",(req,res)=>{
    let {name,content}=req.body;
    let id=uuidv4();
    posts.push({id,name,content});
    res.redirect("/posts");
});