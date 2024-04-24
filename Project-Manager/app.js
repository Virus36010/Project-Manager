
const express = require("express")
const fs = require("fs")
const app = express()
const PORT = 3000
const urlParser = express.urlencoded({extended:false})

app.use(express.static("public"))

app.listen(PORT, ()=>{
  console.log("Server is working on port " + PORT)
})

app.post("/createPr",urlParser,(req,res) => {
  if(!req.body) return res.sendStatus(400);
  console.log("Was added project!")

  let tempUser = req.body
  let data = JSON.parse(fs.readFileSync("projects.json"))
  
  if(data.length<1){
    tempUser.id = 1
  } else {
    tempUser.id = data[data.length-1].id + 1
  }

  tempUser.users = []
  tempUser.targets = []

  res.redirect(req.get('referer'));
  setProjects(tempUser)
})

let setProjects = (user) => {
  let data = JSON.parse(fs.readFileSync("projects.json"))
  data.push(user)
  fs.writeFileSync("projects.json", JSON.stringify(data));
}

app.post("/reg",urlParser,(req,res)=>{
  if(!req.body) return res.sendStatus(400);
  console.log("Was added user!")

  let tempUser = req.body
  let data = JSON.parse(fs.readFileSync("users.json"))

  if(data.length<1){
    tempUser.id = 1
  } else {
    tempUser.id = data[data.length-1].id + 1
  }

  tempUser.projects = []

  res.redirect(req.get('referer'));
  setUsers(tempUser)
})

let setUsers = (user) => {
  let data = JSON.parse(fs.readFileSync("users.json"))
  data.push(user)
  fs.writeFileSync("users.json", JSON.stringify(data));
}

app.post("/find",urlParser,(req,res)=>{
  if(!req.body) return res.sendStatus(400);

  let id = req.body
  let projects = JSON.parse(fs.readFileSync("projects.json"))
  projects = projects.filter(item => item.id = id)
  
})

app.get("/projects",(req,res)=>{
  res.send(JSON.parse(fs.readFileSync("projects.json")))
})
