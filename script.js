
const menuButton = document.getElementById("menuButton");
const dropdownMenu = document.getElementById("dropdownMenu");
const menuLabel = document.getElementById("menuLabel");
const sectionTitle = document.getElementById("sectionTitle");

const menuLinks = dropdownMenu.querySelectorAll("a");
const languageButtons = document.querySelectorAll(".language-button");

const translations = {
    es: {
        personal: "Personal",
        proyectos: "Proyectos",
        info: "Info"
    },
    en: {
        personal: "Personal",
        proyectos: "Projects",
        info: "Info"
    }
};

let currentLanguage = "es";

/* ABRIR Y CERRAR EL DESPLEGABLE */

menuButton.addEventListener("click", (event) => {
    event.stopPropagation();

    const isOpen = dropdownMenu.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
});

/* CAMBIAR DE SECCIÓN */

menuLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const section = link.dataset.section;

        menuLabel.textContent = translations[currentLanguage][section];
        sectionTitle.textContent =
            translations[currentLanguage][section].toUpperCase();

        dropdownMenu.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");

        if (section === "personal") {
            document.querySelector(".image-track").style.animationDuration = "32s";
        }

        if (section === "proyectos") {
            document.querySelector(".image-track").style.animationDuration = "24s";
        }

        if (section === "info") {
            document.querySelector(".image-track").style.animationDuration = "40s";
        }
    });
});

/* CERRAR EL MENÚ AL PULSAR FUERA */

document.addEventListener("click", (event) => {
    if (!event.target.closest(".menu-container")) {
        dropdownMenu.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
    }
});

/* CAMBIAR IDIOMA */

languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
        currentLanguage = button.dataset.lang;

        languageButtons.forEach((item) => {
            item.classList.toggle("active", item === button);
        });

        const currentSection =
            menuLinks.find((link) => link.textContent === menuLabel.textContent)
                ?.dataset.section || "personal";

        menuLabel.textContent = translations[currentLanguage][currentSection];
        sectionTitle.textContent =
            translations[currentLanguage][currentSection].toUpperCase();

        document.documentElement.lang = currentLanguage;
    });
});
