const  express =require("express");
const app=express();
const users =require("./routes/user.js");
const posts =require("./routes/posts.js");
const session =require("express-session");
const flash =require("connect-flash");
const path=require("path")


app.set("views engine ","ejs");
app.set("views",path.join(__dirname,"views"));

const sessionOptions={
    secret:"mysupersecretsring",resave:false,saveUninitialized:true
 };

app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
  res.locals.successMsg=req.flash("success");
  res.locals.errorMsg=req.flash("error");
  next();
})

app.get("/register",(req,res)=>{
  let {name="anonymous"}=req.query;
  req.session.name=name;
  if(name==="anonymous"){
    req.flash("error","user not registered")
  }else{
    req.flash("success","user registered successful");

  }
  res.redirect("/hello");
})

app.get("/hello",(req,res)=>{
 
    res.render("page.ejs",{name:req.session.name})
})







app.listen(3000,()=>{
    console.log("server is listing to 3000")
})