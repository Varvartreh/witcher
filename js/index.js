gsap.isterPlugin(ScrollSmoother, ScrollTrigger)

const sensetivity = 0.4

document.addEventListener('mousemove', (e)=>{
    let dx=(e.clientX-window.innerWidth/2)*sensetivity
    let dy=(e.clientY-window.innerHeight/2)*sensetivity

    gsap.to(".layers__container",{
        duration: 1.5,
        x: x,
        y:y,
        rotationX:y/10,
        rotationY:x/10,
        ease: "power2.out",
    })
    gsap.to(".head-text",{
        duration: 1.5,
        rotationX:-y/10,
        rotationY:-x/10,
        ease: "power2.out",
    })
})

ScrollSmoother.create({
    wrapper:"wrapper",
    content: "wrapper_content",
    smooth:1.5,
    effects:true,
})