
const getProjects = async () => {
  const projects = await (await fetch("http://localhost:3000/projects")).json()

  console.log(projects)

  return projects
}

const getUser = async () => {
  const user = await (await fetch("http://localhost:3000/user")).json()

  console.log(user.id)

  return user.id
}

const showProject = async (ObjPrj) => {
  const project = document.createElement("div")
  project.classList.add("project")

  const members = document.createElement("div")
  members.classList.add("members_list")
  for(let i=0; i<ObjPrj.members.length; i++){
    const member = document.createElement("div")
    member.classList.add("member")
    member.innerHTML = `
    <h4>${ObjPrj.members[i].name} </h4>
    <h4>${ObjPrj.members[i].status}</h4>
    `
    members.appendChild(member)
  }
  project.appendChild(members)

  const targets = document.createElement("div")
  targets.classList.add("targets_list")

  for(let i=0; i<ObjPrj.targets.length; i++){
    const target = document.createElement("div")
    target.classList.add("target")
    target.innerHTML = `
    <h4>${ObjPrj.targets[i].name}</h4><br>
    <h4>${ObjPrj.targets[i].description}</h4>
    `

    const tasks = document.createElement("div")
    for(let j=0; j<ObjPrj.targets[i].tasks.length; j++){
      const task = document.createElement("div")
      task.classList.add("task")

      task.innerHTML = `
      <h3>${ObjPrj.targets[i].tasks[j].name}</h3>
      <h3>${ObjPrj.targets[i].tasks[j].description}</h3>
      `
      tasks.appendChild(task)
    }
    target.appendChild(tasks)
  }
  project.appendChild(targets)

  document.body.appendChild(project)
}

const getProject = async () => {
  const project = await (await fetch("http://localhost:3000/find?id=1")).json()

  console.log(project)
  await showProject(project)

  return project
}

getProject()
