import { projects } from "./data.js";
import { createHtml } from "./utils.js";

function createModalElement(project) {
    const modal = createHtml("div", {
        className: "modal",
        id: `${project.id}Modal`,
    });

    const video = createHtml("video", {
        id: `${project.id}Video`,
        autoplay: "false",
        loop: "false",
        muted: "true",
    });

    const source = createHtml("source", {
        src: project.videoSrc,
        type: "video/mp4",
        id: `${project.id}VideoSrc`,
    });

    const fallback = document.createTextNode(
        "Your browser does not support this video format"
    );

    video.appendChild(source);
    video.appendChild(fallback);

    modal.appendChild(video);

    return modal;
}

function createProjectElement(project) {
    const wrapperElement = createHtml("div", {
        className: "wrapper",
        id: project.id,
    });
    const projectElement = createHtml("div", {
        className: "project",
    });

    const projectName = createHtml("h3", {
        textContent: `${project.name}`,
    });

    const projectImage = createHtml("img", {
        src: `${project.imageSrc}`,
        alt: `${project.name}`,
    });

    const techContainer = createHtml("div", {
        className: "techContainer",
    });

    project.techStack.forEach((tech) => {
        const techElement = createHtml("div", {
            className: `tech ${tech.toLowerCase()}`,
            textContent: tech,
        });
        techContainer.appendChild(techElement);
    });

    const githubLink = createHtml("a", {
        href: `${project.githubLink}`,
        textContent: "Github",
    });

    projectElement.append(projectName, projectImage, techContainer, githubLink);
    wrapperElement.appendChild(projectElement);

    return wrapperElement;
}

export function addProjectsToContainer() {
    const projectsContainer = document.querySelector(".projectsContainer");

    projects.forEach((project) => {
        const projectElement = createProjectElement(project);
        const modal = createModalElement(project);
        projectsContainer.appendChild(modal);
        projectsContainer.appendChild(projectElement);
    });
}
