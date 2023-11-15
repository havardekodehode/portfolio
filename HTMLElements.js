const projects = [
    {
        name: 'Pokedex',
        id: 'pokedex',
        videoSrc: '/videos/pokedexMobile.mp4',
        gifSrc: '/images/pokedexMobile.gif',
        techStack: ['HTML', 'CSS', 'TS', 'React'],
        githubLink: 'https://github.com/havardekodehode/Pokedex',
        imageSrc: 'images/pokeball.svg',
    },
    {
        name: 'Weight on Mars',
        id: 'mars',
        videoSrc: '/videos/marsMobile.mp4',
        gifSrc: '/images/marsMobile.gif',
        techStack: ['HTML', 'CSS', 'JS'],
        githubLink: 'https://github.com/havardekodehode/weightOnMars',
        imageSrc: 'images/MarsBR.webp',
    },
    {
        name: 'Todo list',
        id: 'todo',
        videoSrc: '/videos/todoMobile.mp4',
        gifSrc: '/images/todoMobile.gif',
        techStack: ['HTML', 'CSS', 'JS'],
        githubLink: 'https://github.com/havardekodehode/todo',
        imageSrc: 'images/checkbox.svg',
    },
];

const createHtml = (type = 'div', props = {}) => {
    const element = document.createElement(type);
    Object.entries(props).forEach(([key, val]) => (element[key] = val));
    return element;
};

// function createModalElement(project) {
//     const modal = createHtml('div', {
//         className: 'modal',
//         id: `${project.id}Modal`,
//     });

//     const videoContainer = createHtml('div', {
//         className: 'video-container',
//     });

//     const video = createHtml('video', {
//         id: `${project.id}Video`,
//         autoplay: 'false',
//         loop: 'false',
//         muted: 'true',
//         controls: 'true',
//     });

//     const source = createHtml('source', {
//         src: project.videoSrc,
//         type: 'video/mp4',
//         id: `${project.id}VideoSrc`,
//     });

//     const exitButton = createHtml('button', {
//         id: `${project.id}`,
//         className: 'exit-button',
//         innerText: 'Back',
//     });

//     const fallback = document.createTextNode(
//         'Your browser does not support this video format'
//     );

//     exitButton.addEventListener('click', () => {
//         modal.classList.remove('visible');
//         video.pause();
//         video.currentTime = 0;
//     });

//     video.appendChild(source);
//     video.appendChild(fallback);

//     videoContainer.appendChild(video);
//     videoContainer.appendChild(exitButton);

//     modal.appendChild(videoContainer);

//     return modal;
// }

function createProjectElement(project) {
    const projectElement = createHtml('div', {
        className: `project ${project.id}`,
        id: project.id,
    });

    const projectName = createHtml('h3', {
        textContent: `${project.name}`,
    });

    const projectImage = createHtml('img', {
        src: `${project.imageSrc}`,
        alt: `${project.name}`,
    });

    const techContainer = createHtml('div', {
        className: 'techContainer',
    });

    project.techStack.forEach((tech) => {
        const techElement = createHtml('div', {
            className: `tech ${tech.toLowerCase()}`,
            textContent: tech,
        });
        techContainer.appendChild(techElement);
    });

    const githubLink = createHtml('a', {
        href: `${project.githubLink}`,
        textContent: 'Github',
    });

    projectElement.append(projectName, projectImage, techContainer, githubLink);

    return projectElement;
}

export function addProjectsToContainer() {
    const projectsContainer = document.querySelector('.projectsContainer');

    projects.forEach((project) => {
        const projectElement = createProjectElement(project);
        // const modal = createModalElement(project);
        // projectsContainer.appendChild(modal);
        projectsContainer.appendChild(projectElement);
    });
}
