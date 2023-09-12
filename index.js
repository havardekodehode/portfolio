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
const project1 = document.getElementById("pokemonWrapper");

const pokemonModal = document.getElementById("pokemonModal");
const marsModal = document.getElementById("marsModal");
const todoModal = document.getElementById("todoModal");

const allProjects = document.querySelectorAll(".wrapper");

let touchStartTime = 0;
let touchTimeout;

project1.addEventListener("touchstart", handleTouchStart);
project1.addEventListener("touchend", handleTouchEnd);

function handleTouchStart(e) {
    // Record the start time when the user touches the Pokemon project.
    touchStartTime = Date.now();

    // Set a timeout to show the modal after half a second (500 milliseconds).
    touchTimeout = setTimeout(() => {
        pokemonModal.classList.add("visible");
    }, 100);

    // Prevent any default touch behavior, such as scrolling or zooming.
    e.preventDefault();
}

function handleTouchEnd(e) {
    // Clear the timeout if the touch ends before half a second.
    clearTimeout(touchTimeout);

    // Check if the touch duration was longer than half a second.
    const touchEndTime = Date.now();
    const touchDuration = touchEndTime - touchStartTime;

    if (touchDuration >= 500) {
        // The touch duration was long enough, so keep the modal visible.
        pokemonModal.classList.remove("visible");
    }
}

// project1.addEventListener("mousedown", handleMouseDown);

// function handleMouseDown(e) {
//     console.log(e);
//     switch (e.currentTarget.id) {
//         case "pokemonWrapper":
//             pokemonModal.classList.toggle("visible");
//             pokemonModal.addEventListener("click", handleMouseDown);
//             break;
//         case "marsWrapper":
//             break;
//         case "todoWrapper":
//             break;

//         default:
//             pokemonModal.classList.toggle("visible");

//             break;
//     }
// }
