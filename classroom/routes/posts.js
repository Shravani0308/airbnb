const  express =require("express");
const router = express.Router();

//Index -users
router.get("/",(req,res)=>{
    res.send("Get for posts")
});

// show-users
router.get("/:id",(req,res)=>{
    res.send("Get for posts")
});

//post -users
router.post("/",(req,res)=>{
    res.send("Get for posts")
})

//delete -users
router.delete("/:id",(req,res)=>{
    res.send("DELETE for posts")
});

module.exports=router;