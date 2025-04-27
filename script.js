const tick = document.querySelectorAll('.check .image')
const input = document.querySelectorAll('input')
const progressbar = document.querySelector(".progressbar")
const progressValue = document.querySelector(".progressValue")
const error = document.querySelector("p.error")
const myStatus = document.querySelector(".status")



const inputWorks = JSON.parse(localStorage.getItem('myInputs')) || {
    first  : {
        goal : '',
        done : false,
    },
    second  : {
        goal : '',
        done : false,
    },
    third  : {
        goal : '',
        done : false,
    }
}


let barLength = Object.values(inputWorks).filter((e) =>  e.done).length
const statusText = [
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time to chill now :)'
    ]
    myStatus.innerText = statusText[barLength] 

progressValue.style.width = `${(barLength)/3 * 100}%`

tick.forEach((e)=>{
    e.addEventListener("click" , ()=>{
        const isFilled = [...input].every((i)=>{
             return i.value
        })

        if(isFilled){
            e.parentElement.classList.toggle("completed")
            const inputID = e.nextElementSibling.id
            inputWorks[inputID].done = !inputWorks[inputID].done
            barLength = Object.values(inputWorks).filter((e) =>  e.done).length
            myStatus.innerText = statusText[barLength]
            progressValue.style.width = `${(barLength)/3 * 100}%`
            localStorage.setItem("myInputs",JSON.stringify(inputWorks))
        }
        else{
            progressbar.classList.add("show-error")
        }
    })
})

input.forEach((element) => {
    element.value = inputWorks[element.id].goal

    if(inputWorks[element.id].done){
        element.parentElement.classList.add("completed");
    }
    
    element.addEventListener("focus" , (e)=>{
        progressbar.classList.remove("show-error")
    })
    
    

    element.addEventListener("input",e => {
        if(inputWorks[element.id].done){
            element.value = inputWorks[element.id].goal
            return
        }

        inputWorks[element.id].goal = e.target.value 

        localStorage.setItem("myInputs",JSON.stringify(inputWorks))
    })
    
});

