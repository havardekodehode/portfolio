import { addProjectsToContainer } from "./HTMLElements.js";

addProjectsToContainer();

//Tinder swipe

const imageEl = document.querySelector(".card");

// imageEl.addEventListener()

let startX = 0,
    startY = 0,
    moveX = 0,
    moveY = 0;
const card = document.querySelector(".card");
let likeText = card.querySelector(".is-like");

initCard(card);

function initCard(card) {
    card.addEventListener("pointerdown", onPointerDown);
}

function setTransform(x, y, deg, duration) {
    card.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${deg}deg)`;
    likeText.style.opacity = Math.abs((x / innerWidth) * 2.1);
    likeText.className = `is-like ${x > 0 ? "like" : "like"}`;
    if (duration) card.style.transition = `transform ${duration}ms`;
}

function onPointerDown({ clientX, clientY }) {
    startX = clientX;
    startY = clientY;
    card.addEventListener("pointermove", onPointerMove);
    card.addEventListener("pointerup", onPointerUp);
    card.addEventListener("pointerleave", onPointerUp);
}

function onPointerMove({ clientX, clientY }) {
    moveX = clientX - startX;
    moveY = clientY - startY;
    setTransform(moveX, moveY, (moveX / innerWidth) * 50);
}

function onPointerUp() {
    card.removeEventListener("pointermove", onPointerMove);
    card.removeEventListener("pointerup", onPointerUp);
    card.removeEventListener("pointerleave", onPointerUp);
    if (Math.abs(moveX) > card.clientWidth / 2) {
        card.removeEventListener("pointerdown", onPointerDown);
        complete();
    } else {
        cancel();
    }
}

document.getElementById("like").addEventListener("click", complete);

function complete() {
    document.getElementById("section2").scrollIntoView({
        block: "start",
        behavior: "smooth",
        inline: "start",
    });
    setTimeout(() => {
        document.getElementById("section1").remove();
    }, 2000);
}

function cancel() {
    setTransform(0, 0, 0, 100);
    setTimeout(() => (card.style.transition = ""), 100);
}

// Navigation

//Modal on mousedown

// const page3 = document.getElementById("section3");

const pokemonModal = document.getElementById("pokemonModal");
const marsModal = document.getElementById("marsModal");
const todoModal = document.getElementById("todoModal");

const allProjects = document.querySelectorAll(".wrapper");

allProjects.forEach((p) => {
    p.addEventListener("mousedown", handleStart);
    p.addEventListener("touchstart", handleStart);
    p.addEventListener("mouseleave", handleEnd);
    p.addEventListener("touchend", handleEnd);
    p.addEventListener("touchcancel", handleEnd);
});

function handleStart(e) {
    if (e.type === "touchstart") {
        const currentModal = document.getElementById(
            `${e.currentTarget.id}Modal`
        );
        setTimeout(() => {
            currentModal.classList.add("visible");
            const video = currentModal.querySelector("video");
            video.play();
        }, 200);
        e.preventDefault(); // Prevent scroll/zoom for touch events
    } else if (e.type === "mousedown") {
        const currentModal = document.getElementById(
            `${e.currentTarget.id}Modal`
        );
        currentModal.classList.add("visible");
        const video = currentModal.querySelector("video");
        video.play();
    }
}

function handleEnd(e) {
    if (e.type === "touchend" || e.type === "touchcancel") {
        const currentModal = document.getElementById(
            `${e.currentTarget.id}Modal`
        );
        currentModal.classList.remove("visible");
        const video = currentModal.querySelector("video");
        video.pause();
        video.currentTime = 0;
    } else if (e.type === "mouseleave") {
        const currentModal = document.getElementById(
            `${e.currentTarget.id}Modal`
        );
        currentModal.classList.remove("visible");
        const video = currentModal.querySelector("video");
        video.pause();
        video.currentTime = 0;
    }
}

// const allProjects = document.querySelectorAll(".wrapper");

// allProjects.forEach(
//     (p) => (
//         p.addEventListener("touchstart", handleTouchStart),
//         p.addEventListener("touchend", handleTouchEnd),
//         p.addEventListener("touchcancel", handleTouchEnd)

//         // Add event listeners for mouse events
//     p.addEventListener("mousedown", handleMouseDown);
//     p.addEventListener("mouseleave", handleMouseLeave);
//     )
// );

// function handleTouchStart(e) {
//     const currentModal = document.getElementById(`${e.currentTarget.id}Modal`);
//     setTimeout(() => {
//         currentModal.classList.add("visible");
//         const video = currentModal.querySelector("video");
//         video.play();
//     }, 200);
//     e.preventDefault(); //prevent scroll/zoom
// }

// function handleTouchEnd(e) {
//     const currentModal = document.getElementById(`${e.currentTarget.id}Modal`);
//     currentModal.classList.remove("visible");
//     const video = currentModal.querySelector("video");
//     video.pause();
//     video.currentTime = 0;
// }

//video
function updateVideoSources() {
    const w = window.matchMedia("(min-width: 900px)");
    const source1 = document.getElementById("pokedexVideoSrc");
    const source2 = document.getElementById("marsVideoSrc");
    const source3 = document.getElementById("todoVideoSrc");

    if (w.matches) {
        source1.src = "/videos/pokedexDesktop.mp4";
        source2.src = "/videos/marsDesktop.mp4";
        source3.src = "/videos/todoDesktop.mp4";
    } else {
        source1.src = "/videos/pokedexMobile.mp4";
        source2.src = "/videos/marsMobile.mp4";
        source3.src = "/videos/todoMobile.mp4";
    }

    document.querySelectorAll("video").forEach((v) => {
        v.load();
    });
}

window.addEventListener("load", updateVideoSources);
window.addEventListener("resize", updateVideoSources);

// Swtiping
