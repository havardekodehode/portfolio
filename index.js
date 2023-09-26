import { addProjectsToContainer } from "./HTMLElements.js";

addProjectsToContainer();

//Modal on mousedown

const allProjects = document.querySelectorAll(".wrapper");

allProjects.forEach((p) => {
    p.addEventListener("mousedown", handleStart);
    p.addEventListener("touchstart", handleStart);
    p.addEventListener("touchstart", handleStart);
    p.addEventListener("mouseleave", handleEnd);
    p.addEventListener("touchend", handleEnd);
    p.addEventListener("touchcancel", handleEnd);
});

function handleStart(e) {
    const currentModal = document.getElementById(`${e.currentTarget.id}Modal`);
    if (e.type === "touchstart") {
        setTimeout(() => {
            currentModal.classList.add("visible");
            const video = currentModal.querySelector("video");
            if (video) {
                video.play();
            }
        }, 200);
        e.preventDefault(); // Prevent scroll/zoom for touch events
    } else if (e.type === "mousedown") {
        currentModal.classList.add("visible");
        const video = currentModal.querySelector("video");
        if (video) {
            video.play();
        }
    }

    currentModal.addEventListener("click", () => {
        currentModal.classList.remove("visible");
        const video = currentModal.querySelector("video");
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    });
}

function handleEnd(e) {
    const currentModal = document.getElementById(`${e.currentTarget.id}Modal`);
    if (
        e.type === "touchend" ||
        e.type === "touchcancel" ||
        e.type === "mouseleave"
    ) {
        currentModal.classList.remove("visible");
        const video = currentModal.querySelector("video");
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    }
}

function updateVideoSources() {
    const w = window.matchMedia("(min-width: 768px)");
    const source1 = document.getElementById("pokedexVideoSrc");
    const source2 = document.getElementById("marsVideoSrc");
    const source3 = document.getElementById("todoVideoSrc");

    if (w.matches) {
        source1.src = "/portfolio/videos/pokedexDesktop.mp4";
        source2.src = "/portfolio/videos/marsDesktop.mp4";
        source3.src = "/portfolio/videos/todoDesktop.mp4";
    } else {
        source1.src = "/portfolio/videos/pokedexMobile.mp4";
        source2.src = "/portfolio/videos/marsMobile.mp4";
        source3.src = "/portfolio/videos/todoMobile.mp4";
    }
    // if (w.matches) {
    //     source1.src = "/videos/pokedexDesktop.mp4";
    //     source2.src = "/videos/marsDesktop.mp4";
    //     source3.src = "/videos/todoDesktop.mp4";
    // } else {
    //     source1.src = "/videos/pokedexMobile.mp4";
    //     source2.src = "/videos/marsMobile.mp4";
    //     source3.src = "/videos/todoMobile.mp4";
    // }

    document.querySelectorAll("video").forEach((v) => {
        v.load();
    });
}

window.addEventListener("load", updateVideoSources);
window.addEventListener("resize", updateVideoSources);

// // Swtiping
