
/* =========================================
   PETR JAKL
   PREMIUM PERSONAL PORTFOLIO
   CLEAN JAVASCRIPT
========================================= */


/* =========================================
   1. NAVIGACE NA PODSTRÁNKY
========================================= */

function showPage(pageId) {

    const home = document.getElementById("home");

    const pages = document.querySelectorAll(".page");

    const selectedPage = document.getElementById(pageId);

    if (!home || !selectedPage) {
        console.error("Stránka nebyla nalezena:", pageId);
        return;
    }

    // Skrytí hlavní stránky
    home.style.display = "none";

    // Skrytí všech podstránek
    pages.forEach(page => {
        page.classList.remove("active");
    });

    // Zobrazení vybrané podstránky
    selectedPage.classList.add("active");

    // Návrat na začátek stránky
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   2. NÁVRAT NA HLAVNÍ STRÁNKU
========================================= */

function showHome() {

    const home = document.getElementById("home");

    if (!home) return;

    // Skrytí všech podstránek
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    // Zobrazení hlavní stránky
    home.style.display = "block";

    // Návrat nahoru
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   3. KLÁVESNICOVÉ OVLÁDÁNÍ KARET
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
   5. INICIALIZACE PORTFOLIA
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // Kontrola hlavních částí webu
    const home = document.getElementById("home");

    const technology = document.getElementById("technology");

    const relations = document.getElementById("relations");

    if (!home || !technology || !relations) {

        console.warn(
            "Některá část portfolia nebyla nalezena."
        );

        return;

    }

    console.log(
        "PETR JAKL – PERSONAL PORTFOLIO"
    );

    console.log(
        "Portfolio bylo úspěšně inicializováno."
    );

    if (reducedMotion) {

        console.log(
            "Je aktivní režim omezených animací."
        );

    }

});
