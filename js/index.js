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
            targetElement.scrollIntoView({
                // top: `${targetElement.offsetTop}`,
                behavior: "smooth",
                block: "start",
            });
    });
});

//Scroll functionality
const sectionLinks = document.querySelectorAll(".navBar li");
const sectionContainer = document.querySelector(".sectionContainer");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            const sectionId = entry.target.getAttribute("id");
            const correspondingLink = document.querySelector(
                `[data-target="${sectionId}"]`
            );

            correspondingLink.classList.toggle("active", entry.isIntersecting);
        });
    },
    {
        root: sectionContainer,
        threshold: 0.5,
    }
);

sectionLinks.forEach((link) => {
    const targetId = link.getAttribute("data-target");
    const section = document.getElementById(targetId);

    if (section) {
        observer.observe(section);
    }
});

//Modal on mousedown

const allProjects = document.querySelectorAll(".project");

const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const project = entry.target;
        if (entry.isIntersecting) {
            project.addEventListener("click", handleToggle);
        } else {
            project.removeEventListener("click", handleToggle);
        }
    });
});

allProjects.forEach((p) => {
    projectObserver.observe(p);
});

function handleToggle(e) {
    if (e.target instanceof HTMLAnchorElement) return;
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

//MailJS

emailjs.init("J2gHkP53zORp-fqsE");

window.onload = function () {
    document
        .getElementById("contact-form")
        .addEventListener("submit", function (event) {
            event.preventDefault();
            // generate a five digit number for the contact_number variable
            this.contact_number.value = (Math.random() * 100000) | 0;
            // these IDs from the previous steps
            emailjs.sendForm("contact_service", "contact_form", this).then(
                function () {
                    console.log("SUCCESS!");
                    document.querySelector(".contact-form").style.display =
                        "none";
                    const response = document.createElement("h2");
                    response.textContent = "Sent";
                    document.querySelector(".contact").append(response);
                },
                function (error) {
                    console.log("FAILED...", error);
                }
            );
        });
};
