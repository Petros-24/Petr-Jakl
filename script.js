
/* =========================================
   PETR JAKL
   PREMIUM GEOPOLITICAL ATLAS
   JAVASCRIPT 1/2
========================================= */


/* =========================================
   1. NAVIGACE
========================================= */

function showPage(pageId) {

    const home = document.getElementById("home");
    const pages = document.querySelectorAll(".page");
    const selectedPage = document.getElementById(pageId);

    if (!home || !selectedPage) {
        console.error("Stránka nebyla nalezena:", pageId);
        return;
    }

    home.style.display = "none";

    pages.forEach(page => {
        page.classList.remove("active");
    });

    selectedPage.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   2. NÁVRAT DOMŮ
========================================= */

function showHome() {

    const home = document.getElementById("home");

    if (!home) return;

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    home.style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   3. KLÁVESNICOVÉ OVLÁDÁNÍ
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(
        ".card[role='button']"
    );

    cards.forEach(card => {

        card.addEventListener("keydown", event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();
                card.click();

            }

        });

    });

});


/* =========================================
   4. DETEKCE OMEZENÍ ANIMACÍ
========================================= */

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


/* =========================================
   5. INICIALIZACE MAPY
========================================= */

function initializeWorldMap() {

    const worldMap = document.getElementById("world-map");

    if (!worldMap) {
        console.warn("Mapa nebyla nalezena.");
        return;
    }

    worldMap.classList.add("map-initialized");

    if (reducedMotion) {
        return;
    }

    console.log("Geopolitická mapa inicializována.");

}


/* =========================================
   6. GENERÁTOR DATOVÝCH IMPULZŮ
========================================= */

function initializeDataParticles() {

    const svg = document.querySelector(".map-graphics");

    if (!svg || reducedMotion) return;

    const particleGroup = svg.querySelector(".data-particles");

    if (!particleGroup) return;

    const routes = svg.querySelectorAll(".data-routes path");

    if (!routes.length) return;

    const particleCount = 12;

    for (let i = 0; i < particleCount; i++) {

        const circle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );

        circle.setAttribute("r", i % 3 === 0 ? "2.2" : "1.4");

        circle.setAttribute("class", "data-particle");

        circle.style.opacity = "0";

        particleGroup.appendChild(circle);

        const route = routes[i % routes.length];

        const length = route.getTotalLength();

        const duration = 5000 + Math.random() * 7000;

        const delay = Math.random() * duration;

        const start = performance.now() + delay;

        function animateParticle(now) {

            if (!circle.isConnected) return;

            const progress = ((now - start) % duration) / duration;

            const point = route.getPointAtLength(
                progress * length
            );

            circle.setAttribute("cx", point.x);
            circle.setAttribute("cy", point.y);

            circle.style.opacity =
                progress > 0.05 && progress < 0.95
                    ? "0.9"
                    : "0";

            requestAnimationFrame(animateParticle);

        }

        requestAnimationFrame(animateParticle);

    }

}


/* =========================================
   7. START MAPY
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeWorldMap();

    initializeDataParticles();

});

/* =========================================
   PETR JAKL
   PREMIUM GEOPOLITICAL ATLAS
   JAVASCRIPT 2/2
========================================= */


/* =========================================
   8. ANIMOVANÉ INDIKÁTORY
========================================= */

function initializeMapIndicators() {

    const status = document.querySelector(".map-status");

    if (!status) return;

    const indicator = status.querySelector(".status-dot");

    if (!indicator) return;

    if (reducedMotion) {
        indicator.style.animation = "none";
    }

}


/* =========================================
   9. RADAROVÝ EFEKT
========================================= */

function initializeRadar() {

    const radar = document.querySelector(".scan-line");

    if (!radar) return;

    if (reducedMotion) {
        radar.style.animation = "none";
        radar.style.transform = "none";
    }

}


/* =========================================
   10. ANIMACE MAPOVÝCH BODŮ
========================================= */

function initializeMapMarkers() {

    const markers = document.querySelectorAll(
        ".map-marker"
    );

    if (reducedMotion) {

        markers.forEach(marker => {
            marker.style.animation = "none";
        });

        return;
    }

    markers.forEach((marker, index) => {

        marker.style.animationDelay =
            `${index * 0.35}s`;

    });

}


/* =========================================
   11. RESPONZIVNÍ MAPA
========================================= */

function initializeResponsiveMap() {

    const map = document.querySelector(".map-graphics");

    if (!map) return;

    if (!map.hasAttribute("preserveAspectRatio")) {

        map.setAttribute(
            "preserveAspectRatio",
            "xMidYMid meet"
        );

    }

}


/* =========================================
   12. FINÁLNÍ INICIALIZACE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeMapIndicators();

    initializeRadar();

    initializeMapMarkers();

    initializeResponsiveMap();

    console.log(
        "PETR JAKL – GEOPOLITICAL ATLAS"
    );

    console.log(
        "JavaScript byl úspěšně inicializován."
    );

});
