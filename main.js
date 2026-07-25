var typed= new Typed(".text", {
    strings:["Computer Science Student"],
    typeSpeed:100,
    backSpeed:100,
    backDelay:1000,
    loop:true
});

// Highlight nav link based on which section is in view
const sections = document.querySelectorAll("section[id], div[id='Skills'], div[id='portfolio']");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
    let current = "";
    const scrollPos = window.scrollY + 150; // offset to account for fixed header

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// About Me modal
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const aboutModal = document.getElementById("aboutModal");

openModalBtn.addEventListener("click", (e) => {
    e.preventDefault();
    aboutModal.classList.add("active");
    modalNavLinks.forEach(link => link.classList.remove("active"));
    document.querySelector('.modal-quicknav a[href="#modal-education"]').classList.add("active");
});

closeModalBtn.addEventListener("click", () => {
    aboutModal.classList.remove("active");
});

aboutModal.addEventListener("click", (e) => {
    if (e.target === aboutModal) {
        aboutModal.classList.remove("active");
    }
});

// Highlight modal quicknav pill based on which section is in view
const modalBody = document.querySelector(".modal-box");
const modalSections = document.querySelectorAll(".modal-section");
const modalNavLinks = document.querySelectorAll(".modal-quicknav a");

function setActiveModalLink(id) {
    modalNavLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
}

// Clicking a pill marks it active immediately, no need to wait for scroll
modalNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
        setActiveModalLink(link.getAttribute("href").slice(1));
    });
});

if (modalBody && modalSections.length) {
    modalBody.addEventListener("scroll", () => {
        const atBottom = Math.ceil(modalBody.scrollTop + modalBody.clientHeight) >= modalBody.scrollHeight - 2;

        if (atBottom) {
            setActiveModalLink(modalSections[modalSections.length - 1].id);
            return;
        }

        const triggerLine = modalBody.scrollTop + 110;
        let current = modalSections[0].id;

        modalSections.forEach((section) => {
            if (section.offsetTop <= triggerLine) {
                current = section.id;
            }
        });

        setActiveModalLink(current);
    });
}