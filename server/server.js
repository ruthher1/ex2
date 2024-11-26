const fs = require("fs")
const path = require("path")

const {gimatria}= require("./letters.js")
const express=require("express")
const app=express()
const PORT=process.env.PORT ||7000

app.get("/api/:word",(req,res)=>{
    const {word}=req.params
    
    const arrLetters=word.split('')
    const arr=arrLetters.map((lett)=>{return gimatria.find((l)=>{return l.let===lett})})
    let result=0
    arr.forEach((e)=>{result=result+e.id })


    fs.readFile(path.join(__dirname,"words.json"), 'utf8',
    (err,data)=>{
        const arr=JSON.parse(data)
        arr.push(word)
        fs.writeFile(path.join(__dirname,'words.json'),JSON.stringify(arr),
        (err)=>{
        if(err) throw err;
    })
    })
    
    


    res.json(result)

})



app.listen(PORT,()=>{
    console.log(`Server runing on port ${PORT}`)
})