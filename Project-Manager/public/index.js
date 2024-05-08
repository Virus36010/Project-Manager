
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
