gsap.registerPlugin(ScrollSmoother, ScrollTrigger)

const sensetivity = 0.2

document.addEventListener('mousemove', (e) => {
    let dx = (e.clientX - window.innerWidth / 2) * sensetivity
    let dy = (e.clientY - window.innerHeight / 2) * sensetivity

    gsap.to(".layers__container", {
        duration: 1.5,
        x: -dx/3,
        y: -dy/3,
        rotationX: dy / 50,
        rotationY: dx / 50,
        ease: "power2.out",
    })
    gsap.to(".head-text", {
        duration: 1.5,
        x: -dx/2,
        y: -dy/2,
        ease: "power2.out",
    })
})

ScrollSmoother.create({
    wrapper: "wrapper",
    content: "wrapper_content",
    smooth: 1.5,
    effects: true,
})

/*gsap.utils.toArray('section').forEach(section => {
    gsap.fromTo(
        section,
        { opacity: 0, y: 100 },
        {
            opacity: 1, y: 0, scrollTrigger: {
                trigger: section,
                start: 'start center+10',
                end: 'start center',
                toggleActions: "play none none reverse",
            }
        }

    )
})*/


function initGallery(){
    let gallery = document.querySelector('.gallery')
    let gallery_item = document.querySelectorAll('.gallery_item')
    gallery.style.setProperty("--total-items", gallery_item.length)
    gallery.addEventListener('click', (event)=>{
        let clicked = event.target.closest(".gallery_item")
        if (!clicked || clicked.classList.contains("active")) return

        gallery_item.forEach((item)=>{
            item.classList.remove("active")
    })
    clicked.classList.add("active")
    })
}

document.addEventListener('DOMContentLoaded', initGallery)


const themeChanger = document.querySelector(".theme-change")

themeChanger.addEventListener("click", () =>{
    let isLight = localStorage.getItem('theme')=='light'
    let card = document.querySelector('.background')
    if(isLight){
        localStorage.setItem('theme', 'dark')
        themeChanger.innerHTML = '<i class="fas fa-moon"></i>'
        document.documentElement.style.setProperty("--dark", "#FFFFFF")
        document.documentElement.style.setProperty("--light", "#161616")
        document.documentElement.style.setProperty("--text-d", "#FFFFFF")
        document.documentElement.style.setProperty("--text-l", "#000000")
        document.documentElement.style.setProperty("--gray", "#333333")
        document.style = "background-image: url(images/image.png)"
    }
    else{
        localStorage.setItem('theme', 'light')
        themeChanger.innerHTML =  '<i class="fas fa-sun"></i>'
        document.documentElement.style.setProperty("--dark", "#161616")
        document.documentElement.style.setProperty("--light", "#FFFFFF")
        document.documentElement.style.setProperty("--text-d", "#000000")
        document.documentElement.style.setProperty("--text-l", "#FFFFFF")
        document.documentElement.style.setProperty("--gray", "gray")
        document.style = "background-image: url(images/w_bac_night.webp)"
    }
})

function initPlayer(){
    const btn = document.querySelector('.play-btn')
    const audio = document.getElementById("audioPlayer")
    const progress = document.querySelector('.progress')

    btn.addEventListener('click', () =>{
        if (audio.paused){
            audio.play()
            btn.innerHTML = "<i class='fa fa-pause '></i>"
        }
        else{    
            audio.pause()
            btn.innerHTML = "<i class='fa fa-play '></i>"
        }
    })
    
    const time= document.querySelector('.time')
    audio.addEventListener('timeupdate', () =>{
        progress.style.width = `${audio.currentTime/audio.duration * 100}%`

        let minutes = Math.floor(audio.currentTime / 60)
        let seconds = Math.floor(audio.currentTime % 60).toString().padStart(2,'0')
        let maxminutes = Math.floor(audio.duration / 60)
        let maxseconds = Math.floor(audio.duration % 60).toString().padStart(2,'0')

        time.innerHTML=`${minutes}:${seconds}/${maxminutes}:${maxseconds}`
    }) 

    document.querySelector('.progress-bar').addEventListener('click', (e) =>{
        const rect = e.target.getBoundingClientRect()
        const pos = (e.clientX - rect.left)/rect.width
        audio.currentTime = pos*audio.duration
    })
} 

document.addEventListener('DOMContentLoaded', initPlayer)
