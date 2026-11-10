
/* =========================================
   PETR JAKL
   GEOPOLITICAL WORLD ATLAS
   JAVASCRIPT – PART 1/2
========================================= */


/* =========================================
   01. KONFIGURACE
========================================= */

const MAP_CONFIG = {

    sources: [
        "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json",
        "https://unpkg.com/world-atlas@2/countries-50m.json"
    ],

    colors: {
        country: "rgba(49, 112, 133, 0.16)",
        border: "rgba(104, 210, 228, 0.82)",
        internal: "rgba(112, 205, 220, 0.65)",
        gold: "#c8a96e",
        cyan: "#65d9e8",
        blue: "#61a9d7"
    },

    padding: 15

};


/* =========================================
   02. GEOGRAFICKÁ CENTRA
========================================= */

const WORLD_POINTS = [

    { name: "New York", coordinates: [-74.006, 40.7128], type: "gold" },

    { name: "London", coordinates: [-0.1276, 51.5072], type: "cyan" },

    { name: "Paris", coordinates: [2.3522, 48.8566], type: "blue" },

    { name: "Berlin", coordinates: [13.405, 52.52], type: "cyan" },

    { name: "Dubai", coordinates: [55.2708, 25.2048], type: "gold" },

    { name: "Singapore", coordinates: [103.8198, 1.3521], type: "blue" },

    { name: "Tokyo", coordinates: [139.6917, 35.6895], type: "cyan" },

    { name: "Hong Kong", coordinates: [114.1694, 22.3193], type: "gold" },

    { name: "Mumbai", coordinates: [72.8777, 19.076], type: "blue" },

    { name: "Sydney", coordinates: [151.2093, -33.8688], type: "cyan" },

    { name: "Sao Paulo", coordinates: [-46.6333, -23.5505], type: "gold" },

    { name: "Cape Town", coordinates: [18.4241, -33.9249], type: "blue" }

];


/* =========================================
   03. DATOVÉ TRASY
========================================= */

const WORLD_ROUTES = [

    [0, 1],
    [1, 2],
    [1, 3],
    [1, 4],
    [2, 5],
    [4, 5],
    [5, 6],
    [5, 7],
    [5, 8],
    [6, 9],
    [0, 10],
    [2, 11],
    [3, 6],
    [0, 4]

];


/* =========================================
   04. ZVÝRAZNĚNÉ STÁTY
========================================= */

const HIGHLIGHTED_COUNTRIES = new Set([

    "840",
    "276",
    "250",
    "392",
    "156",
    "356",
    "826",
    "784",
    "702"

]);


/* =========================================
   05. POMOCNÁ SVG FUNKCE
========================================= */

function createSVG(name, attributes = {}) {

    const element = document.createElementNS(

        "http://www.w3.org/2000/svg",

        name

    );

    Object.entries(attributes).forEach(([key, value]) => {

        element.setAttribute(key, value);

    });

    return element;

}


/* =========================================
   06. SVG DEFINICE
========================================= */

function createDefinitions(svg) {

    const defs = createSVG("defs");


    // Světelný efekt hranic

    const filter = createSVG("filter", {

        id: "country-glow",

        x: "-30%",
        y: "-30%",

        width: "160%",
        height: "160%"

    });


    const blur = createSVG("feGaussianBlur", {

        stdDeviation: "1.3",

        result: "blur"

    });


    const merge = createSVG("feMerge");

    merge.appendChild(

        createSVG("feMergeNode", {

            in: "blur"

        })

    );

    merge.appendChild(

        createSVG("feMergeNode", {

            in: "SourceGraphic"

        })

    );


    filter.appendChild(blur);

    filter.appendChild(merge);

    defs.appendChild(filter);


    // Světelný gradient bodů

    const gradient = createSVG("radialGradient", {

        id: "point-gradient"

    });


    gradient.appendChild(

        createSVG("stop", {

            offset: "0%",

            "stop-color": "#ffffff",

            "stop-opacity": "1"

        })

    );


    gradient.appendChild(

        createSVG("stop", {

            offset: "40%",

            "stop-color": "#65d9e8",

            "stop-opacity": ".8"

        })

    );


    gradient.appendChild(

        createSVG("stop", {

            offset: "100%",

            "stop-color": "#65d9e8",

            "stop-opacity": "0"

        })

    );


    defs.appendChild(gradient);

    svg.appendChild(defs);

}


/* =========================================
   07. GEOGRAFICKÁ PROJEKCE
========================================= */

function createMapProjection(width, height) {

    const projection = d3.geoNaturalEarth1();


    projection.fitExtent(

        [

            [MAP_CONFIG.padding, MAP_CONFIG.padding],

            [

                width - MAP_CONFIG.padding,

                height - MAP_CONFIG.padding

            ]

        ],

        { type: "Sphere" }

    );


    return projection;

}


/* =========================================
   08. VYTVOŘENÍ SVG PLÁTNA
========================================= */

function createMapCanvas(container, width, height) {

    const svg = createSVG("svg", {

        viewBox: `0 0 ${width} ${height}`,

        preserveAspectRatio: "xMidYMid meet",

        role: "presentation",

        "aria-hidden": "true"

    });


    svg.style.width = "100%";

    svg.style.height = "100%";

    svg.style.display = "block";


    container.replaceChildren(svg);


    return svg;

}


/* =========================================
   09. GEOGRAFICKÁ MŘÍŽKA
========================================= */

function drawGraticule(svg, path) {

    const graticule = d3.geoGraticule()

        .step([30, 30])();


    const grid = createSVG("path", {

        d: path(graticule),

        fill: "none",

        stroke: "rgba(97,169,215,.12)",

        "stroke-width": ".65",

        "vector-effect": "non-scaling-stroke"

    });


    svg.appendChild(grid);

}


/* =========================================
   10. VYKRESLENÍ STÁTŮ
========================================= */

function drawCountries(svg, world, path) {

    const countries = topojson.feature(

        world,

        world.objects.countries

    ).features;


    const layer = createSVG("g", {

        class: "country-layer"

    });


    countries.forEach(country => {

        const id = String(country.id);


        const highlighted =

            HIGHLIGHTED_COUNTRIES.has(id);


        const element = createSVG("path", {

            d: path(country),

            class: highlighted

                ? "country highlight"

                : "country",

            "data-country": id

        });


        element.style.fill = highlighted

            ? "rgba(87,192,207,.18)"

            : MAP_CONFIG.colors.country;


        element.style.stroke = MAP_CONFIG.colors.border;

        element.style.strokeWidth = ".65";

        element.style.strokeLinejoin = "round";

        element.style.strokeLinecap = "round";

        element.style.vectorEffect = "non-scaling-stroke";

        element.style.filter = "url(#country-glow)";


        layer.appendChild(element);

    });


    svg.appendChild(layer);

}


/* =========================================
   KONEC PRVNÍ ČÁSTI
========================================= */

/* =========================================
   PETR JAKL
   GEOPOLITICAL WORLD ATLAS
   JAVASCRIPT – PART 2/2
========================================= */


/* =========================================
   11. VNITŘNÍ STÁTNÍ HRANICE
========================================= */

function drawCountryBorders(svg, world, path) {

    const borders = topojson.mesh(

        world,

        world.objects.countries,

        (a, b) => a !== b

    );


    const element = createSVG("path", {

        d: path(borders),

        class: "country-borders",

        fill: "none",

        stroke: MAP_CONFIG.colors.internal,

        "stroke-width": ".65",

        "stroke-linejoin": "round",

        "vector-effect": "non-scaling-stroke"

    });


    svg.appendChild(element);

}


/* =========================================
   12. ANIMOVANÉ DATOVÉ TRASY
========================================= */

function drawRoutes(svg, path) {

    const layer = createSVG("g", {

        class: "route-layer"

    });


    WORLD_ROUTES.forEach((route, index) => {

        const start = WORLD_POINTS[route[0]];

        const end = WORLD_POINTS[route[1]];


        if (!start || !end) return;


        const interpolate = d3.geoInterpolate(

            start.coordinates,

            end.coordinates

        );


        const coordinates = d3.range(0, 1.001, 0.02)

            .map(t => interpolate(t));


        const geometry = {

            type: "LineString",

            coordinates: coordinates

        };


        const routeElement = createSVG("path", {

            d: path(geometry),

            class: index % 4 === 0

                ? "map-route gold"

                : "map-route"

        });


        routeElement.style.animationDelay =

            `${index * -0.8}s`;


        layer.appendChild(routeElement);

    });


    svg.appendChild(layer);

}


/* =========================================
   13. ANIMOVANÉ GEOGRAFICKÉ BODY
========================================= */

function drawWorldPoints(svg, projection) {

    const layer = createSVG("g", {

        class: "point-layer"

    });


    WORLD_POINTS.forEach((point, index) => {

        const position = projection(point.coordinates);


        if (!position) return;


        const group = createSVG("g", {

            class: "geographic-point",

            transform:

                `translate(${position[0]},${position[1]})`

        });


        // Světelná aura

        const aura = createSVG("circle", {

            r: "10",

            fill: "url(#point-gradient)",

            opacity: ".7"

        });


        // Pulzující bod

        const pulse = createSVG("circle", {

            r: "3.2",

            class: `map-point ${point.type}`

        });


        // Středový bod

        const center = createSVG("circle", {

            r: "1.2",

            fill: "#ffffff"

        });


        pulse.style.animationDelay =

            `${index * 0.25}s`;


        group.appendChild(aura);

        group.appendChild(pulse);

        group.appendChild(center);


        layer.appendChild(group);

    });


    svg.appendChild(layer);

}


/* =========================================
   14. KOMPLETNÍ VYKRESLENÍ MAPY
========================================= */

function renderWorldMap(container, world) {

    const width = Math.max(

        300,

        container.clientWidth

    );


    const height = Math.max(

        250,

        container.clientHeight

    );


    const svg = createMapCanvas(

        container,

        width,

        height

    );


    createDefinitions(svg);


    const projection = createMapProjection(

        width,

        height

    );


    const path = d3.geoPath(projection);


    // 1. Geografická mřížka

    drawGraticule(svg, path);


    // 2. Státy

    drawCountries(svg, world, path);


    // 3. Státní hranice

    drawCountryBorders(svg, world, path);


    // 4. Datové trasy

    drawRoutes(svg, path);


    // 5. Světelné body

    drawWorldPoints(svg, projection);


    container.classList.add("map-ready");

    container.dataset.mapStatus = "ready";


    console.log(

        `Mapa vykreslena: ${world.objects.countries.geometries.length} geografických objektů.`

    );

}


/* =========================================
   15. NAČTENÍ GEOGRAFICKÝCH DAT
========================================= */

async function loadGeographicData() {

    let lastError;


    for (const url of MAP_CONFIG.sources) {

        try {

            console.log(

                "Načítání geografických dat:",

                url

            );


            const response = await fetch(url, {

                cache: "force-cache"

            });


            if (!response.ok) {

                throw new Error(

                    `HTTP ${response.status}`

                );

            }


            const world = await response.json();


            if (

                !world.objects ||

                !world.objects.countries ||

                !world.objects.countries.geometries

            ) {

                throw new Error(

                    "Neplatná struktura geografických dat."

                );

            }


            return world;

        }


        catch (error) {

            lastError = error;

            console.warn(

                "Geografický zdroj není dostupný:",

                error

            );

        }

    }


    throw lastError || new Error(

        "Geografická data nejsou dostupná."

    );

}


/* =========================================
   16. INICIALIZACE SVĚTOVÉ MAPY
========================================= */

async function initializeWorldMap() {

    const container = document.getElementById(

        "world-map"

    );


    if (!container) {

        console.error(

            "Element #world-map nebyl nalezen."

        );

        return;

    }


    container.dataset.mapStatus = "loading";


    // Kontrola geografických knihoven

    if (

        typeof d3 === "undefined" ||

        typeof topojson === "undefined"

    ) {

        container.dataset.mapStatus = "error";


        console.error(

            "D3.js nebo TopoJSON se nepodařilo načíst. Zkontroluj připojení a HTML."

        );

        return;

    }


    try {

        const world = await loadGeographicData();


        renderWorldMap(

            container,

            world

        );


        initializeMapResize(

            container,

            world

        );


    }


    catch (error) {

        container.dataset.mapStatus = "error";


        console.error(

            "CHYBA MAPY:",

            error

        );


        console.error(

            "Zkontroluj internetové připojení, CDN a konzoli prohlížeče."

        );

    }

}


/* =========================================
   17. AUTOMATICKÁ RESPONZIVITA
========================================= */

function initializeMapResize(container, world) {

    if (typeof ResizeObserver === "undefined") {

        window.addEventListener("resize", () => {

            renderWorldMap(container, world);

        }, {

            passive: true

        });

        return;

    }


    let frame = null;


    const observer = new ResizeObserver(() => {

        if (frame !== null) {

            cancelAnimationFrame(frame);

        }


        frame = requestAnimationFrame(() => {

            renderWorldMap(container, world);

            frame = null;

        });

    });


    observer.observe(container);

}


/* =========================================
   18. NAVIGACE
========================================= */

function showPage(pageId) {

    const home = document.getElementById("home");

    const pages = document.querySelectorAll(".page");

    const selectedPage = document.getElementById(pageId);


    if (!home || !selectedPage) {

        console.error(

            "Stránka nebyla nalezena:",

            pageId

        );

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
   19. NÁVRAT DOMŮ
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
   20. KLÁVESNICOVÉ OVLÁDÁNÍ
========================================= */

function initializeCards() {

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

}


/* =========================================
   21. OMEZENÍ ANIMACÍ
========================================= */

function initializeMotionSettings() {

    const preference = window.matchMedia(

        "(prefers-reduced-motion: reduce)"

    );


    function update() {

        document.documentElement.classList.toggle(

            "reduced-motion",

            preference.matches

        );

    }


    update();


    if (preference.addEventListener) {

        preference.addEventListener("change", update);

    }

}


/* =========================================
   22. SPUŠTĚNÍ WEBU
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log(

        "PETR JAKL – GEOPOLITICAL ATLAS"

    );


    initializeCards();

    initializeMotionSettings();


    // Spuštění skutečné geografické mapy

    initializeWorldMap();

});


/* =========================================
   KONEC JAVASCRIPTU
========================================= */
