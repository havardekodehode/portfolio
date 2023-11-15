import { addProjectsToContainer } from './HTMLElements.js';

addProjectsToContainer();

//Navbar functionality

const liEls = document.querySelectorAll('.navbar ul li');

liEls.forEach((li) => {
    li.addEventListener('click', () => {
        const targetElement = document.getElementById(
            li.getAttribute('data-target')
        );
        if (targetElement.id === 'about-me-section') {
            console.log(targetElement.id);

            const offset = targetElement.offsetTop + window.innerHeight;
            targetElement.scrollIntoView({
                top: offset,
                behavior: 'smooth',
                block: 'start',
            });
        }
        if (targetElement)
            targetElement.scrollIntoView({
                top: `${targetElement.offsetTop}`,
                behavior: 'smooth',
                block: 'start',
            });
    });
});

const sections = document.querySelectorAll('section');

const SectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                document.querySelectorAll('[data-target]').forEach((link) => {
                    // console.log(link);
                    link.classList.remove('active');
                });

                const targetLink = document.querySelector(
                    `[data-target="${entry.target.id}"]`
                );
                if (targetLink) {
                    targetLink.classList.add('active');
                }
            }
        });
    },
    { threshold: 0.5 }
);

sections.forEach((section) => {
    SectionObserver.observe(section);
});

// about me text fade-in

const aboutMeBlocks = document.querySelectorAll('.about-me-block');

const TextObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            const aboutMeBlock = entry.target;
            if (entry.isIntersecting) {
                aboutMeBlock.classList.remove('hidden');
                aboutMeBlock.classList.add('visible');
                aboutMeBlock.classList.add('fade-in');
            }
        });
    },
    { threshold: 0.5 }
);

aboutMeBlocks.forEach((b) => {
    TextObserver.observe(b);
});

//Animating background

document.addEventListener('DOMContentLoaded', function () {
    const containersToObserve = document.querySelectorAll(
        '.hero, .about-me-text, #project-section, #contact-section'
    );

    const bottomPath = document.querySelector('.bottom');
    const topPath = document.querySelector('.top');
    const bottomPathD = document.querySelector('.bottom-desktop');
    const topPathD = document.querySelector('.top-desktop');

    let currentIndex = 0;

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
    };

    const handleIntersection = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const index = Array.from(containersToObserve).indexOf(
                    entry.target
                );

                switch (index) {
                    case 0:
                        topPath.style.transform =
                            'translateY(0%) translateX(-80%) scale(1)';
                        bottomPath.style.transform =
                            'translateY(0%) translateX(-100%) scale(1)';
                        topPathD.style.transform =
                            'translateY(0%) translateX(-80%) scale(1)';
                        bottomPathD.style.transform =
                            'translateY(0%) translateX(-100%) scale(1)';

                        break;

                    case 1:
                        topPath.style.transform =
                            'translateY(0%) translateX(-100%) scale(0.4)';
                        bottomPath.style.transform =
                            'translateY(0%) translateX(-100%) scale(4)';
                        topPathD.style.transform =
                            'translateY(0%) translateX(-100%) scale(0.4)';
                        bottomPathD.style.transform =
                            'translateY(0%) translateX(-100%) scale(4)';

                        break;

                    case 2:
                        topPath.style.transform =
                            'translateY(0%) translateX(-100%) scale(4)';
                        bottomPath.style.transform =
                            'translateY(50%) translateX(-100%) scale(1)';
                        topPathD.style.transform =
                            'translateY(0%) translateX(-100%) scale(4)';
                        bottomPathD.style.transform =
                            'translateY(50%) translateX(-100%) scale(1)';

                        break;

                    case 3:
                        topPath.style.transform = 'translateY(0%) scale(0.6)';
                        bottomPath.style.transform =
                            'translateY(0%) translateX(0%) scale(0.8)';
                        topPathD.style.transform = 'translateY(0%) scale(0.6)';
                        bottomPathD.style.transform =
                            'translateY(0%) translateX(0%) scale(0.8)';

                        break;

                    default:
                        break;
                }
            }
        });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    containersToObserve.forEach((container) => {
        observer.observe(container);
    });
});

//MailJS

emailjs.init('J2gHkP53zORp-fqsE');

window.onload = function () {
    document
        .getElementById('contact-form')
        .addEventListener('submit', function (event) {
            event.preventDefault();
            // generate a five digit number for the contact_number variable
            this.contact_number.value = (Math.random() * 100000) | 0;
            // these IDs from the previous steps
            emailjs.sendForm('contact_service', 'contact_form', this).then(
                function () {
                    console.log('SUCCESS!');
                    document.querySelector('.contact-form').style.display =
                        'none';
                    const response = document.createElement('h3');
                    response.textContent = 'Sent';
                    document.querySelector('.form-container').append(response);
                },
                function (error) {
                    console.log('FAILED...', error);
                }
            );
        });
};
