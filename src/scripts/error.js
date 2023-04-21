(()=>{
        const button = document.getElementById("new-try-button")
        console.log(button)
        button.addEventListener("click", ()=>{
            window.history.back()
        })
})()