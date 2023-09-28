import { addProjectsToContainer } from "./HTMLElements.js";
import { initCard } from "./tinderSwipe.js";

const card = document.querySelector(".card");
initCard(card);
addProjectsToContainer();

//Navbar functionality
const liEls = document.querySelectorAll(".navBar ul li");

liEls.forEach((li) => {
    li.addEventListener("click", () => {
        const targetElement = document.getElementById(
            li.getAttribute("data-target")
        );
        if (targetElement)
            targetElement.parentElement.scrollTo({
                top: `${targetElement.offsetTop}`,
                behavior: "smooth",
            });
        // if (targetElement) targetElement.scrollIntoView({ behavior: "smooth" });
    });
});

//Modal on mousedown
const allProjects = document.querySelectorAll(".wrapper");

allProjects.forEach((p) => {
    p.addEventListener("click", handleToggle);
});

function handleToggle(e) {
    const projectId = e.currentTarget.id;
    const currentModal = document.getElementById(`${projectId}Modal`);
    const video = currentModal.querySelector("video");
    currentModal.classList.add("visible");
    video.play();
}

//Updating video source
function updateVideoSources() {
    const w = window.matchMedia("(min-width: 768px)");
    const source1 = document.getElementById("pokedexVideoSrc");
    const source2 = document.getElementById("marsVideoSrc");
    const source3 = document.getElementById("todoVideoSrc");

    // if (w.matches) {
    //     source1.src = "/portfolio/videos/pokedexDesktop.mp4";
    //     source2.src = "/portfolio/videos/marsDesktop.mp4";
    //     source3.src = "/portfolio/videos/todoDesktop.mp4";
    // } else {
    //     source1.src = "/portfolio/videos/pokedexMobile.mp4";
    //     source2.src = "/portfolio/videos/marsMobile.mp4";
    //     source3.src = "/portfolio/videos/todoMobile.mp4";
    // }
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
