const backgroundEl = document.getElementById("background")


function background(elements){
    for (let i = 1; i < elements; i++) {
        const div = document.createElement("div")
        // const posx = Math.floor(Math.random()*100+1)
        // const posy = Math.floor(Math.random()*100+1)
        // data-posX="${posx}" data.posY="${posy}"
        const example = Math.floor(Math.random()*10+1)
        // div.style.animationName = `example${example}`
        div.style.animationName = `example1`
        div.style.transform = `translateY(${i*20}rem) translateX(${-example*2}rem) rotate(130deg)`
        // div.style.left = "-1000px"
        div.style.height = `${example}00`
        div.className= `background b1 `
        setTimeout(()=>{
            backgroundEl.append(div)

        }, example * 1200)
        // i===1?div.style.backgroundColor="red":console.log("nothing");
    }
    console.log("heeei")
    
}

background(10)