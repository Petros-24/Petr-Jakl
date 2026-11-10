
/* =========================================
   PETR JAKL – OSOBNÍ PORTFOLIO
   HLAVNÍ JAVASCRIPT
========================================= */


/* =========================================
   1. PŘECHOD NA PODSTRÁNKU
========================================= */

function showPage(pageId) {

    const home = document.getElementById("home");

    const pages = document.querySelectorAll(".page");

    const selectedPage = document.getElementById(pageId);

    // Kontrola existence stránky

    if (!home || !selectedPage) {

        console.error(
            "Požadovaná podstránka nebyla nalezena:",
            pageId
        );

        return;
    }

    // Skrytí hlavní stránky

    home.style.display = "none";

    // Odebrání aktivního stavu ostatním stránkám

    pages.forEach(page => {

        page.classList.remove("active");

    });

    // Aktivace vybrané stránky

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
   3. OVLÁDÁNÍ DLAŽDIC KLÁVESNICÍ
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll(
        ".card[role='button']"
    );

    cards.forEach(card => {

        card.addEventListener("keydown", function(event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                card.click();

            }

        });

    });


    /* =====================================
       4. ANIMACE PŘI NAČTENÍ STRÁNKY
    ===================================== */

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!reducedMotion) {

        document.body.classList.add("page-loaded");

    }


    /* =====================================
       5. KONTROLA GRAFICKÉ MAPY
    ===================================== */

    const worldMap = document.querySelector(
        ".world-map"
    );

    if (worldMap) {

        console.log(
            "Grafická mapa světa byla úspěšně načtena."
        );

    } else {

        console.warn(
            "Grafická mapa nebyla nalezena."
        );

    }


    /* =====================================
       6. KONTROLA NAVIGACE
    ===================================== */

    const navigation = document.querySelector("nav");

    if (!navigation) {

        console.warn(
            "Navigace nebyla nalezena."
        );

    }


    /* =====================================
       7. INFORMACE O SPUŠTĚNÍ
    ===================================== */

    console.log(
        "Petr Jakl – osobní portfolio"
    );

    console.log(
        "JavaScript byl úspěšně inicializován."
    );

});


/* =========================================
   8. KONEC SCRIPTU
========================================= */
