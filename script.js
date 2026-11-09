
/* =========================================
   PETR JAKL - PORTFOLIO
   INTERAKTIVNI GEOPOLITICKA MAPA
========================================= */


/* =========================================
   1. NAVIGACE
========================================= */

function showPage(pageId) {

    const home = document.getElementById("home");
    const pages = document.querySelectorAll(".page");
    const selectedPage = document.getElementById(pageId);

    if (!home || !selectedPage) return;

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


function showHome() {

    const home = document.getElementById("home");
    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
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
   2. POCKANI NA NACTENI STRANKY
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const mapElement = document.getElementById("world-map");

    if (!mapElement) {
        console.warn("Mapa nebyla nalezena.");
        return;
    }

    if (typeof L === "undefined") {
        console.error("Knihovna Leaflet se nenačetla.");
        mapElement.innerHTML =
            '<div style="color:#c8a96e;text-align:center;padding:40px">Mapu se nepodařilo načíst. Zkontroluj připojení k internetu.</div>';
        return;
    }


    /* =====================================
       3. VYTVORENI MAPY
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
       4. TMAVY MAPOVY PODKLAD
    ===================================== */

    const tileLayer = L.tileLayer(

        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",

        {

            attribution:
                '&copy; OpenStreetMap &copy; CARTO',

            subdomains: "abcd",

            maxZoom: 19,

            crossOrigin: true

        }

    );

    tileLayer.addTo(map);


    tileLayer.on("tileerror", function () {
        console.warn("Některý mapový podklad se nepodařilo načíst.");
    });


    /* =====================================
       5. OVLADANI MAPY
    ===================================== */

    L.control.zoom({

        position: "bottomright"

    }).addTo(map);


    /* =====================================
       6. VLASTNI MAPOVE IKONY
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
       7. INFORMACNI OKNA
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
       8. HLAVNI GEOPOLITICKE UZLY
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
                "Letecký průmysl, výzkum a moderní autonomní systémy."
        },

        {
            name: "Východní Asie",
            coords: [35, 110],
            symbol: "◎",
            type: "blue",
            category: "TECHNOLOGICKÁ CENTRA",
            description:
                "Elektronika, robotika, polovodiče a technologické inovace."
        },

        {
            name: "Severní Atlantik",
            coords: [48, -35],
            symbol: "⚓",
            type: "military",
            category: "NÁMOŘNÍ TECHNOLOGIE",
            description:
                "Námořní doprava, navigace a globální obchodní trasy."
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
            category: "GEOPOLITIKA",
            description:
                "Energetika, mezinárodní vztahy a globální bezpečnost."
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
                "Digitální infrastruktura, energetika a moderní technologie."
        }

    ];


    /* =====================================
       9. VYKRESLENI HLAVNICH UZLU
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
       10. RADAROVE ZONY
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
       11. DATOVE PROPOJENI
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
       12. TECHNOLOGICKE A VOJENSKE SYMBOLY
    ===================================== */

    const technologyMarkers = [

        {
            coords: [52, 30],
            symbol: "✈",
            type: "military",
            title: "Moderní letectví",
            description: "Ilustrační symbol leteckých technologií."
        },

        {
            coords: [10, 90],
            symbol: "◉",
            type: "blue",
            title: "Satelitní systémy",
            description: "Ilustrační symbol satelitních technologií."
        },

        {
            coords: [-5, -25],
            symbol: "◆",
            type: "gold",
            title: "Digitální infrastruktura",
            description: "Ilustrační symbol globální datové infrastruktury."
        },

        {
            coords: [25, -45],
            symbol: "⌖",
            type: "red",
            title: "Radarové technologie",
            description: "Ilustrační symbol radarových a senzorových systémů."
        },

        {
            coords: [-30, 120],
            symbol: "⚓",
            type: "military",
            title: "Námořní technologie",
            description: "Ilustrační symbol námořních technologií."
        },

        {
            coords: [60, 100],
            symbol: "✥",
            type: "blue",
            title: "Robotika a autonomní systémy",
            description: "Ilustrační symbol robotiky a autonomních technologií."
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
       13. ANIMACE MAPY
    ===================================== */

    let animationFrame = null;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!reducedMotion) {

        let phase = 0;

        function animateMap() {

            phase += 0.025;

            const pulseOpacity =
                0.25 + Math.sin(phase) * 0.15;

            document.querySelectorAll(
                ".marker-pulse"
            ).forEach(marker => {

                marker.style.opacity = pulseOpacity;

            });

            animationFrame = requestAnimationFrame(
                animateMap
            );

        }

        animateMap();

    }


    /* =====================================
       14. RESIZE MAPY
    ===================================== */

    window.addEventListener("resize", function () {

        map.invalidateSize();

    });


    /* =====================================
       15. PRVNI ZOBRAZENI
    ===================================== */

    setTimeout(function () {

        map.invalidateSize();

        map.setView([25, 10], 2);

    }, 500);


    /* =====================================
       16. KONEC INICIALIZACE
    ===================================== */

    console.log(
        "Portfolio Petr Jakl: mapa byla inicializována."
    );

});
