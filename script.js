

// let characters
// fetch('http://swapi.dev/api/people/')
// .then( resp => resp.json() )
// .then( data =>data). 

// console.log(characters)

let characters = []
let clickedPlanets = []
let urlOfHomeworld = ""

function buildPage() {

    let body = ``
    for (let i = 0; i < characters.length; i++) {

        body += `<p class="planet" planet="${characters[i].homeworld}">${characters[i].name}</p>`

    }


    document.querySelector(".characters").innerHTML = body
    clickedPlanets = document.querySelectorAll(".planet")
    for (const clicked of clickedPlanets) {
        clicked.addEventListener("click", event => {
            urlOfHomeworld = event.target.getAttribute("planet")
            let name=event.target.innerText
            makeHomeWorldRequest(urlOfHomeworld,name)

        })
    }

}

async function makeRequest(next) {
    let response = await fetch(next)
    let data = await response.json()

    for (const e of data.results) {
        characters.push(e)
    }

    if (data.next != null) {
        makeRequest(data.next)
    } else
        buildPage()

}



async function makeHomeWorldRequest(url,name) {
    let response = await fetch(url)
    let planet = await response.json()
    document.querySelector("header :last-child").innerText=name
    let homePlanet = `
        <h3>Planet</h3>
        <h2>${planet.name}</h2>
        <p>Rotation Period: ${planet.rotation_period}</p>
        <p>Orbital Period: ${planet.orbital_period}</p>
        <p>Diameter: ${planet.diameter}</p>
        <p>Climate: ${planet.climate}</p>
        <p>Gravity: ${planet.gravity}</p>
        <p>Terrain: ${planet.terrain}</p>
        <p>Surface Water: ${planet.surface_water}</p>
        <p>population: ${planet.population}</p>
    `
    document.querySelector(".planets").innerHTML = homePlanet

}

makeRequest('http://swapi.dev/api/people/')



// clickedPlanet.getAttribute("planet")



