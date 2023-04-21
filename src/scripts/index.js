gitInputSearch()

function gitInputSearch(){

    const searchButton = document.getElementById("search-button")
 
    searchButton.addEventListener("click", async (e) => {
        e.preventDefault()
        const inputValue = document.getElementById("search-way").value.toLowerCase()
        if(!inputValue){
            alert("Digite um nome de usuário")
            return
        }
        const userPromise = findUser(inputValue)
        userPromise.then((userData) => {
            const userDataEncoded = encodeURIComponent(JSON.stringify(userData))
            window.location.href = `./src/pages/profile.html?userData=${userDataEncoded}`
        }).catch((error) => {
            console.log(error)
            window.location.href = "./src/pages/error.html"
        })
    })
}

async function findUser(username){

        const res = await fetch(`https://api.github.com/users/${username}`)
        if(!res.ok){
            throw new Error("Usuário não encontrado")
        }
        return await res.json()
} 