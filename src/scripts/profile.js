getProfileInfo()

function getProfileInfo(){
  const urlParams = new URLSearchParams(window.location.search)
  const userDataEncoded = urlParams.get("userData")
  const userData = JSON.parse(decodeURIComponent(userDataEncoded))
     renderUserInfo(userData)
     getRepositories()
     const userChange = document.querySelector(".header__button")
     userChange.addEventListener("click", () => {
       window.history.back()
      })
}
function renderUserInfo(userData) {
      const header = document.createElement("header")
      header.classList.add("header")
      const { avatar_url, name } = userData
    
      const userBox = document.createElement('div')
      userBox.classList.add('header__user-box')
    
      const imgContainer = document.createElement('div')
      imgContainer.classList.add('user-box__img-container')
    
      const img = document.createElement('img')
      img.src = avatar_url
      img.alt = 'user-img'
    
      imgContainer.appendChild(img)
      userBox.appendChild(imgContainer)
    
      const userName = document.createElement('p')
      userName.classList.add('user-box__user-name')
      userName.classList.add('title-user-name')
      userName.textContent = name
    
      userBox.appendChild(userName)
      header.appendChild(userBox)
    
      const button = document.createElement('button')
      button.classList.add('header__button')
      button.textContent = 'Trocar de usuário'
    
      header.appendChild(button)
      document.body.insertAdjacentElement("afterbegin", header)
  
}
async function getRepositories(){
  const urlParams = new URLSearchParams(window.location.search)
  const userDataEncoded = urlParams.get("userData")
  const userData = JSON.parse(decodeURIComponent(userDataEncoded))
  
  const response = await fetch(`https://api.github.com/users/${userData.login}/repos`)
  const repositories = await response.json()
  
  renderRepositories(repositories)
}
function renderRepositories(repositories){
  const repositoriesList = document.querySelector(".repositories__list")
  
  repositories.forEach((repository) => {
    const repositoryItem = document.createElement("li")
    repositoryItem.classList.add("repositories__item")
    
    const title = document.createElement("h2")
    title.classList.add("repositories__item-title")
    title.classList.add("title-repositories-component")
    title.textContent = repository.name
    
    const description = document.createElement("p")
    description.classList.add("repositories__item-description")
    description.classList.add("description-repositories-component")
    description.textContent = repository.description
  
    const button = document.createElement("button")
    button.classList.add("repositories__item-button")
    button.textContent = "Repositório"
    button.addEventListener("click", () => {
      window.open(repository.html_url, "_blank")
    })
    
    repositoryItem.appendChild(title)
    repositoryItem.appendChild(description)
    repositoryItem.appendChild(button)
  
    repositoriesList.appendChild(repositoryItem)
  })
}