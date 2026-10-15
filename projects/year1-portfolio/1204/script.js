// script.js

document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector(".gnav");
    const navLinks = document.querySelectorAll('.gnav a[href^="#"]');
    const sections = Array.from(document.querySelectorAll("section[id]"));
    const yearSpan = document.getElementById("year");

    // Set current year in footer
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Add background to nav on scroll
    const handleNavBackground = () => {
        if (window.scrollY > 40) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", handleNavBackground);
    handleNavBackground();

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            if (!targetId.startsWith("#")) return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Highlight active link based on scroll position
    const setActiveLink = () => {
        const scrollPos = window.scrollY + 120; // offset for header

        let currentId = null;
        sections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                currentId = sec.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            const href = link.getAttribute("href").replace("#", "");
            if (href === currentId) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", setActiveLink);
    setActiveLink();
});
