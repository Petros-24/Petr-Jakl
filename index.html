
/* =========================================
   PETR JAKL - INTERACTIVE WORLD MAP
========================================= */


/* =========================================
   NAVIGACE WEBU
========================================= */

function showPage(pageId) {

    document.getElementById("home").style.display = "none";

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function showHome() {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById("home").style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (window.worldMap) {
        setTimeout(() => {
            window.worldMap.invalidateSize();
        }, 300);
    }
}


/* =========================================
   INICIALIZACE MAPY
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const mapElement = document.getElementById("world-map");

    if (!mapElement || typeof L === "undefined") {
        console.error("Mapa Leaflet nebyla načtena.");
        return;
    }

    // Vytvoření mapy

    const map = L.map("world-map", {
        center: [25, 10],
        zoom: 2,
        minZoom: 2,
        maxZoom: 7,
        zoomControl: true,
        scrollWheelZoom: true,
        worldCopyJump: true
    });

    window.worldMap = map;


    /* =====================================
       TMAVÝ MAPOVÝ PODKLAD
    ===================================== */

    L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',

            subdomains: "abcd",

            maxZoom: 19
        }
    ).addTo(map);


    /* =====================================
       VLASTNÍ IKONY
    ===================================== */

    function createIcon(symbol, type) {

        return L.divIcon({

            className: "custom-map-marker",

            html: `
                <div class="marker-wrapper ${type}">
                    <div class="marker-pulse"></div>
                    <div class="marker-symbol">${symbol}</div>
                </div>
            `,

            iconSize: [34, 34],

            iconAnchor: [17, 17],

            popupAnchor: [0, -18]

        });

    }


    /* =====================================
       STYLOVANÉ POPUP OKNO
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
       STRATEGICKÉ A TECHNOLOGICKÉ UZLY
       
       Demonstrační geografické body.
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
                "Letecký průmysl, výzkum, moderní technologie a vývoj autonomních systémů."
        },

        {
            name: "Východní Asie",
            coords: [35, 110],
            symbol: "◎",
            type: "blue",
            category: "TECHNOLOGICKÁ CENTRA",
            description:
                "Elektronika, robotika, výroba polovodičů a technologické inovace."
        },

        {
            name: "Severní Atlantik",
            coords: [48, -35],
            symbol: "◈",
            type: "military",
            category: "NÁMOŘNÍ TECHNOLOGIE",
            description:
                "Námořní doprava, navigace a sledování globálních obchodních tras."
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
                "Významná oblast z hlediska energetiky, mezinárodních vztahů a bezpečnosti."
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
            category: "ROZVOJ TECHNOLOGIÍ",
            description:
                "Digitální infrastruktura, energetika a rozvoj moderních technologií."
        }

    ];


    /* =====================================
       VYKRESLENÍ UZLŮ
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
       RADAROVÉ KRUHY
    ===================================== */

    const radarPositions = [

        [50, 15],
        [35, 110],
        [39, -98],
        [28, 45]

    ];

    radarPositions.forEach(position => {

        // Vnější radarový kruh

        L.circle(position, {

            radius: 450000,

            color: "#c8a96e",

            weight: 1,

            opacity: 0.45,

            fillColor: "#c8a96e",

            fillOpacity: 0.025,

            interactive: false

        }).addTo(map);


        // Vnitřní radarový kruh

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
       DATOVÉ TRASY
    ===================================== */

    const connections = [

        {
            from: [50, 15],
            to: [39, -98]
        },

        {
            from: [50, 15],
            to: [35, 110]
        },

        {
            from: [35, 110],
            to: [28, 45]
        },

        {
            from: [39, -98],
            to: [48, -35]
        },

        {
            from: [-15, 75],
            to: [35, 110]
        },

        {
            from: [5, 20],
            to: [50, 15]
        }

    ];


    connections.forEach(connection => {

        L.polyline(

            [
                connection.from,
                connection.to
            ],

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
       STYLOVANÉ ZNAČKY TECHNOLOGIÍ
    ===================================== */

    const technologyMarkers = [

        {
            coords: [52, 30],
            symbol: "✈",
            type: "military",
            title: "Letecké technologie",
            description:
                "Ilustrační značka moderního letectví."
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
            symbol: "✥",
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
       ZÁVĚREČNÉ NASTAVENÍ
    ===================================== */

    setTimeout(() => {

        map.invalidateSize();

    }, 500);


    // Jemný návrat na výchozí pohled

    map.on("click", function () {

        // Mapa zůstává plně ovladatelná.

    });

});


/* =========================================
   KONEC SCRIPTU
========================================= */
