
/* =========================================
   PETR JAKL - PORTFOLIO
   INTERAKTIVNÍ SVĚTOVÁ MAPA
========================================= */


/* =========================================
   1. NAVIGACE
========================================= */

function showPage(pageId) {

    const home = document.getElementById("home");
    const pages = document.querySelectorAll(".page");
    const selectedPage = document.getElementById(pageId);

    if (!home || !selectedPage) {
        console.error("Požadovaná podstránka nebyla nalezena:", pageId);
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
   2. NÁVRAT NA ÚVOD
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

    if (window.worldMap) {

        setTimeout(() => {
            window.worldMap.invalidateSize();
        }, 400);

    }

}


/* =========================================
   3. INICIALIZACE MAPY
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const mapElement = document.getElementById("world-map");

    if (!mapElement) {
        console.warn("Mapa nebyla nalezena.");
        return;
    }

    if (typeof L === "undefined") {

        console.error("Knihovna Leaflet nebyla načtena.");

        mapElement.innerHTML = `
            <div style="
                color:#c8a96e;
                text-align:center;
                padding:40px;
                font-family:Montserrat,sans-serif;
            ">
                Mapu se nepodařilo načíst.
                Zkontroluj připojení k internetu.
            </div>
        `;

        return;
    }

    if (window.worldMap) {
        window.worldMap.remove();
    }


    /* =====================================
       4. VYTVOŘENÍ MAPY
    ===================================== */

    const map = L.map("world-map", {

        center: [25, 10],

        zoom: 2,

        minZoom: 2,

        maxZoom: 7,

        zoomControl: false,

        scrollWheelZoom: true,

        worldCopyJump: true,

        attributionControl: true

    });

    window.worldMap = map;


    /* =====================================
       5. TMAVÝ MAPOVÝ PODKLAD
       
       Bez API klíče.
    ===================================== */

    const tileLayer = L.tileLayer(

        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",

        {

            subdomains: "abcd",

            maxZoom: 19,

            attribution:
                '&copy; OpenStreetMap &copy; CARTO'

        }

    );

    tileLayer.addTo(map);

    tileLayer.on("tileerror", function () {
        console.warn("Nepodařilo se načíst některou mapovou dlaždici.");
    });


    /* =====================================
       6. OVLÁDÁNÍ MAPY
    ===================================== */

    L.control.zoom({

        position: "bottomright"

    }).addTo(map);


    /* =====================================
       7. VLASTNÍ IKONY
    ===================================== */

    function createIcon(symbol, type) {

        return L.divIcon({

            className: "custom-map-marker",

            html: `
                <div class="marker-wrapper ${type}">

                    <div class="marker-pulse"></div>

                    <div class="marker-symbol">
                        ${symbol}
                    </div>

                </div>
            `,

            iconSize: [34, 34],

            iconAnchor: [17, 17],

            popupAnchor: [0, -20]

        });

    }


    /* =====================================
       8. INFORMAČNÍ OKNA
    ===================================== */

    function createPopup(title, description, category) {

        return `

            <div style="
                min-width:180px;
                padding:5px;
                font-family:Montserrat,sans-serif;
            ">

                <div style="
                    color:#c8a96e;
                    font-size:9px;
                    letter-spacing:3px;
                    margin-bottom:9px;
                ">
                    ${category}
                </div>

                <div style="
                    color:#fff;
                    font-size:14px;
                    font-weight:600;
                    margin-bottom:8px;
                ">
                    ${title}
                </div>

                <div style="
                    color:#999;
                    font-size:11px;
                    line-height:1.8;
                ">
                    ${description}
                </div>

            </div>

        `;

    }


    /* =====================================
       9. HLAVNÍ SVĚTOVÉ OBLASTI
    ===================================== */

    const locations = [

        {
            name: "Evropa",
            coords: [50, 15],
            symbol: "✦",
            type: "gold",
            category: "TECHNOLOGIE",
            description:
                "Technologický vývoj, průmysl, inovace a mezinárodní spolupráce."
        },

        {
            name: "Severní Amerika",
            coords: [39, -98],
            symbol: "✈",
            type: "military",
            category: "LETECKÉ TECHNOLOGIE",
            description:
                "Letecký průmysl, výzkum a moderní technologické inovace."
        },

        {
            name: "Východní Asie",
            coords: [35, 110],
            symbol: "◎",
            type: "blue",
            category: "TECHNOLOGICKÁ CENTRA",
            description:
                "Elektronika, robotika, polovodiče a technologický vývoj."
        },

        {
            name: "Severní Atlantik",
            coords: [48, -35],
            symbol: "⚓",
            type: "military",
            category: "NÁMOŘNÍ TECHNOLOGIE",
            description:
                "Námořní doprava, navigace a mezinárodní obchod."
        },

        {
            name: "Indický oceán",
            coords: [-15, 75],
            symbol: "◉",
            type: "blue",
            category: "SATELITNÍ TECHNOLOGIE",
            description:
                "Satelitní komunikace, navigace a globální datová infrastruktura."
        },

        {
            name: "Blízký východ",
            coords: [28, 45],
            symbol: "⌖",
            type: "red",
            category: "MEZINÁRODNÍ VZTAHY",
            description:
                "Energetika, mezinárodní vztahy a geopolitický vývoj."
        },

        {
            name: "Jižní Amerika",
            coords: [-15, -60],
            symbol: "✦",
            type: "gold",
            category: "GLOBÁLNÍ PROPOJENÍ",
            description:
                "Přírodní zdroje, infrastruktura a mezinárodní obchod."
        },

        {
            name: "Afrika",
            coords: [5, 20],
            symbol: "◎",
            type: "blue",
            category: "TECHNOLOGICKÝ ROZVOJ",
            description:
                "Digitální infrastruktura, energetika a rozvoj moderních technologií."
        }

    ];


    /* =====================================
       10. VYKRESLENÍ HLAVNÍCH UZLŮ
    ===================================== */

    locations.forEach(location => {

        const marker = L.marker(

            location.coords,

            {
                icon: createIcon(
                    location.symbol,
                    location.type
                )
            }

        ).addTo(map);

        marker.bindPopup(

            createPopup(
                location.name,
                location.description,
                location.category
            )

        );

    });


    /* =====================================
       11. RADAROVÉ KRUHY
    ===================================== */

    const radarPositions = [

        [50, 15],
        [35, 110],
        [39, -98],
        [28, 45]

    ];

    radarPositions.forEach(position => {

        L.circle(position, {

            radius: 450000,

            color: "#c8a96e",

            weight: 1,

            opacity: 0.4,

            fillColor: "#c8a96e",

            fillOpacity: 0.025,

            interactive: false

        }).addTo(map);


        L.circle(position, {

            radius: 180000,

            color: "#c8a96e",

            weight: 1,

            opacity: 0.6,

            dashArray: "4 7",

            fillOpacity: 0,

            interactive: false

        }).addTo(map);

    });


    /* =====================================
       12. PROPOJENÍ SVĚTOVÝCH OBLASTÍ
    ===================================== */

    const connections = [

        [[50, 15], [39, -98]],

        [[50, 15], [35, 110]],

        [[35, 110], [28, 45]],

        [[39, -98], [48, -35]],

        [[-15, 75], [35, 110]],

        [[5, 20], [50, 15]],

        [[-15, -60], [5, 20]]

    ];

    connections.forEach(connection => {

        L.polyline(

            connection,

            {

                color: "#c8a96e",

                weight: 1.2,

                opacity: 0.55,

                dashArray: "5 9",

                interactive: false

            }

        ).addTo(map);

    });


    /* =====================================
       13. TECHNOLOGICKÉ ZNAČKY
    ===================================== */

    const technologyMarkers = [

        {
            coords: [52, 30],
            symbol: "✈",
            type: "military",
            title: "Moderní letectví",
            description:
                "Ilustrační značka leteckých technologií."
        },

        {
            coords: [10, 90],
            symbol: "◉",
            type: "blue",
            title: "Satelitní systémy",
            description:
                "Ilustrační značka satelitních technologií."
        },

        {
            coords: [-5, -25],
            symbol: "◆",
            type: "gold",
            title: "Digitální infrastruktura",
            description:
                "Ilustrační značka globální datové infrastruktury."
        },

        {
            coords: [25, -45],
            symbol: "⌖",
            type: "red",
            title: "Radarové technologie",
            description:
                "Ilustrační značka radarových a senzorových systémů."
        },

        {
            coords: [-30, 120],
            symbol: "⚓",
            type: "military",
            title: "Námořní technologie",
            description:
                "Ilustrační značka námořních technologií."
        },

        {
            coords: [60, 100],
            symbol: "✥",
            type: "blue",
            title: "Robotika a autonomní systémy",
            description:
                "Ilustrační značka robotiky a autonomních technologií."
        }

    ];

    technologyMarkers.forEach(item => {

        L.marker(

            item.coords,

            {
                icon: createIcon(
                    item.symbol,
                    item.type
                )
            }

        )

        .addTo(map)

        .bindPopup(

            createPopup(
                item.title,
                item.description,
                "TECHNOLOGIE"
            )

        );

    });


    /* =====================================
       14. ANIMACE ZNAČEK
    ===================================== */

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationFrame = null;

    if (!reducedMotion) {

        let phase = 0;

        function animateMap() {

            phase += 0.025;

            const opacity =
                0.25 + Math.sin(phase) * 0.15;

            document.querySelectorAll(
                "#world-map .marker-pulse"
            ).forEach(marker => {

                marker.style.opacity = opacity;

            });

            animationFrame = requestAnimationFrame(
                animateMap
            );

        }

        animateMap();

    }


    /* =====================================
       15. ZMĚNA VELIKOSTI OKNA
    ===================================== */

    window.addEventListener("resize", function () {

        map.invalidateSize();

    });


    /* =====================================
       16. PRVNÍ ZOBRAZENÍ
    ===================================== */

    setTimeout(function () {

        map.invalidateSize();

        map.setView([25, 10], 2);

    }, 500);


    /* =====================================
       17. INFORMACE O SPUŠTĚNÍ
    ===================================== */

    console.log(
        "Portfolio Petr Jakl: mapa byla úspěšně inicializována."
    );

});


/* =========================================
   KONEC SCRIPTU
========================================= */
