const express = require('express');
const app = express();
const hbs = require('hbs')
const path = require('path')

const mainpath = path.join(__dirname, "../public")
const template_path = path.join(__dirname, "../templates/views")
const partials_path = path.join(__dirname, "../templates/partials")

app.use(express.static(mainpath))

app.set('view engine', 'hbs')
app.set('views', template_path)

hbs.registerPartials(partials_path)

app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/about",(req,res)=>{
    res.render("about")
})
app.get("/weather",(req,res)=>{
    res.render("weather")
})
app.get("*",(req,res)=>{
    res.render("404err", {
        errMsg : "Oops! Page not found"
    })
})

app.listen(8000,()=>{
    console.log("server started");
})