// //Tinder swipe

// Tinder swipe
document.body.style.overflow = "hidden";

let startX = 0,
    startY = 0,
    moveX = 0,
    moveY = 0;

const card = document.querySelector(".card");

let likeText = card.querySelector(".is-like");

function initCard(card) {
    card.addEventListener("pointerdown", onPointerDown);
    card.addEventListener("touchstart", onTouchStart);
}

function onPointerDown({ clientX, clientY }) {
    card.classList.remove("swipeHint");
    card.style.transform = "rotate(0deg)";

    startX = clientX;
    startY = clientY;
    card.addEventListener("pointermove", onPointerMove);
    card.addEventListener("pointerup", onPointerUp);
    card.addEventListener("pointerleave", onPointerUp);
}

function onTouchStart(event) {
    event.preventDefault();
    const touch = event.touches[0];
    onPointerDown({
        clientX: touch.clientX,
        clientY: touch.clientY,
    });
}

function setTransform(x, y, deg, duration) {
    card.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${deg}deg)`;
    likeText.style.opacity = Math.abs((x / innerWidth) * 2.1);
    likeText.className = `is-like ${x > 0 ? "like" : "nope"}`;
    if (duration) card.style.transition = `transform ${duration}ms`;
}

function onPointerMove({ clientX, clientY }) {
    moveX = clientX - startX;
    moveY = clientY - startY;
    const viewportWidth = window.innerWidth;

    if (moveX < -viewportWidth / 2.2 || moveX > viewportWidth / 2.2) {
        complete();
    } else {
        setTransform(moveX, moveY, (moveX / viewportWidth) * 50);
    }
}

function onPointerUp() {
    card.removeEventListener("pointermove", onPointerMove);
    card.removeEventListener("pointerup", onPointerUp);
    card.removeEventListener("pointerleave", onPointerUp);
    if (Math.abs(moveX) > card.clientWidth / 2) {
        complete();
        // cancel();
    } else {
        cancel();
    }
}
const scrollYBefore = window.scrollY;

function complete() {
    setTimeout(() => {
        document.getElementById("section1").scrollIntoView({
            block: "center",
            behavior: "smooth",
            inline: "start",
        });
    }, 600);

    setTimeout(() => {
        document.querySelector("header").style.display = "none";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollYBefore - 100);
    }, 900);
}

function cancel() {
    setTransform(0, 0, 0, 100);
    setTimeout(() => (card.style.transition = ""), 100);
}

export { initCard };

document.getElementById("like").addEventListener("click", complete);
