const express=require("express");
const app =express();
const port=3000;
const path=require("path");
const {v4:uuidv4}=require("uuid");
const methodOverride=require("method-override");


app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set("view engine","ejs");
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

app.get ("/posts/:id",(req,res)=>{
   let {id}=req.params;
   let post=posts.find((p)=>id===p.id);
   res.render("show.ejs",{post});

});


app.get("/posts/:id/edit",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
});
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;

    let newContent=req.body.content;
    
    let post= posts.find((p)=>id===p.id);
    post.content=newContent;
    
    res.redirect("/posts");
});

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!=p.id);
    res.redirect("/posts");
});