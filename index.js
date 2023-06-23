const backgroundEl = document.getElementById("background")


function background(elements){
    for (let i = 0; i < elements; i++) {
        const div = document.createElement("div")
        // const posx = Math.floor(Math.random()*100+1)
        // const posy = Math.floor(Math.random()*100+1)
        // data-posX="${posx}" data.posY="${posy}"
        const example = Math.floor(Math.random()*10+1)
        // div.innerHTML = `
        // <div class="background b${i}" >
        // </div>
        // // `
        div.style.animationName = `example${example}`
        div.style.height = `${i}00`
        div.className= `background b${i}`
        backgroundEl.append(div)
        console.log(i + " " + `
        <div class="background b${example}" >
        </div>
        // `);
    }
    console.log("heeei")
    
}

background(10)