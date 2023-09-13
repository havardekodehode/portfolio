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

function complete() {
    document.getElementById("page2").scrollIntoView({
        block: "start",
        behavior: "smooth",
        inline: "start",
    });
    setTimeout(() => {
        document.getElementById("page1").remove();
    }, 2000);
}

function cancel() {
    setTransform(0, 0, 0, 100);
    setTimeout(() => (card.style.transition = ""), 100);
}

// Navigation

//Modal on mousedown

const page3 = document.getElementById("page3");

const pokemonModal = document.getElementById("pokemonModal");
const marsModal = document.getElementById("marsModal");
const todoModal = document.getElementById("todoModal");

const allProjects = document.querySelectorAll(".wrapper");

// let touchStartTime = 0;
// let touchTimeout;

// const project1 = document.getElementById("pokemonWrapper");

// project1.addEventListener("touchstart", handleTouchStart);
// project1.addEventListener("touchend", handleTouchEnd);

allProjects.forEach(
    (p) => (
        p.addEventListener("touchstart", handleTouchStart),
        p.addEventListener("touchend", handleTouchEnd)
    )
);

function handleTouchStart(e) {
    const currentModal = document.getElementById(`${e.currentTarget.id}Modal`);
    setTimeout(() => {
        currentModal.classList.add("visible");
    }, 200);
    e.preventDefault(); //prevent scroll/zoom
}

function handleTouchEnd(e) {
    const currentModal = document.getElementById(`${e.currentTarget.id}Modal`);
    currentModal.classList.remove("visible");
}

// Swtiping

const sections = document.querySelectorAll(".page");
let currentSectionIndex = 0;
let isSwiping = false;
let initialTouchY = 0;
let scrollY = 0;

document.addEventListener("touchstart", (e) => {
    isSwiping = true;
    initialTouchY = e.touches[0].clientY;
    scrollY = window.scrollY;
});

document.addEventListener("touchend", () => {
    isSwiping = false;
    const diffY = window.scrollY - currentSectionIndex * window.innerHeight;

    if (diffY > 50 && currentSectionIndex > 0) {
        // Swipe up to go to the previous section
        currentSectionIndex--;
    } else if (diffY < -20 && currentSectionIndex < sections.length - 1) {
        // Swipe down to go to the next section
        currentSectionIndex++;
    }

    scrollToSection(currentSectionIndex);
});

function scrollToSection(index) {
    window.scrollTo({
        top: index + 1 * window.innerHeight,
        behavior: "smooth",
    });
}
