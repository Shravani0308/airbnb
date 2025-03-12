const  express =require("express");
const router = express.Router();

//Index -users
router.get("/",(req,res)=>{
    res.send("Get for users")
});

// show-users
router.get("/:id",(req,res)=>{
    res.send("Get for users")
});

//post -users
router.post("/",(req,res)=>{
    res.send("Get for users")
})

//delete -users
router.delete("/:id",(req,res)=>{
    res.send("DELETE for users")
});

module.exports=router;