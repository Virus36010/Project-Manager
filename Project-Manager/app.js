
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

  tempUser.members = []
  tempUser.targets = []

  res.redirect(req.get('referer'));
  setProjects(tempUser)
})

let setProjects = (user) => {
  let data = JSON.parse(fs.readFileSync("projects.json"))
  data.push(user)
  fs.writeFileSync("projects.json", JSON.stringify(data));
}

let user
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

  console.log(tempUser)
  user = tempUser
})
app.get("/user",(req,res)=>{
  res.send(user)
})

let setUsers = (user) => {
  let data = JSON.parse(fs.readFileSync("users.json"))
  data.push(user)
  fs.writeFileSync("users.json", JSON.stringify(data));
}

let OBJproject
app.get("/find",(req,res)=>{
  if(!req.body) return res.sendStatus(400);

  let id = req.body.id
  let projects = JSON.parse(fs.readFileSync("projects.json"))
  projects = projects.filter((item) => item.id == id)
  OBJproject = projects[0]
  //res.redirect("http://localhost:3000/project");
  //res.redirect(req.get('referer'));
  res.send(OBJproject)
})
app.get("/OBJproject",(req,res)=>{
  res.send(OBJproject)
})

app.get("/project",(req,res)=>{
  //res.redirect("http://localhost:3000/project")
})

app.get("/projects",(req,res)=>{
  res.send(JSON.parse(fs.readFileSync("projects.json")))
})
