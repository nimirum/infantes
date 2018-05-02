import { attributesToString } from './index'

const cityDetails = (city, targetEl) => {
  const container = document.createElement('div')
  container.classList.add('card')
  const body = document.createElement('div')
  body.classList.add('card-body')
  container.appendChild(body)
  const header = createHeader(city)
  body.appendChild(header)
  const data = createData(city)
  body.appendChild(data)

  document.getElementById(targetEl).appendChild(container)
}

const createHeader = (city) => {
  const header = document.createElement('div')
  header.classList.add('card-title', 'card-area-name')
  const headerText = document.createTextNode(city.Area)
  header.appendChild(headerText)
  const regionTextContainer = document.createElement('div')
  regionTextContainer.classList.add('card-region-name')
  const regionText = document.createTextNode(`(${city.Region}, population: ${city.Population})`)
  regionTextContainer.appendChild(regionText)
  header.appendChild(regionTextContainer)
  return header
}

const createData = (city) => {
  const container = document.createElement('div')
  container.appendChild(createBirthsData(city))
  container.appendChild(createUnemploymentData(city))
  container.appendChild(createUniversityData(city))
  return container
}

const createBirthsData = (city) => {
  const container = document.createElement('div')
  const createBirthCol = createBirthColWithCity(city)
  container.classList.add('data-row')

  container.appendChild(createBirthStartNode())
  container.appendChild(createBirthCol(2015))
  container.appendChild(createBirthCol(2016))
  container.appendChild(createBirthCol(2017))
  container.appendChild(createBirthCol('Change%'))
  container.appendChild(createBirthCol('PopulationRatio'))
  return container
}

const createBirthStartNode = () => {
  const container = document.createElement('div')
  container.classList.add('data-col')
  const header = document.createElement('span')
  header.classList.add('data-cell-header')
  header.appendChild(document.createTextNode('Year'))
  container.appendChild(header)
  container.appendChild(document.createElement('br'))
  container.appendChild(document.createTextNode('Births'))
  return container
}

const createBirthColWithCity = (city) => (year) => {
  const attr = `Births${year.toString()}`
  const container = document.createElement('div')
  const value = Math.round(city[attr] * 100) / 100
  container.classList.add('data-col')
  const header = document.createElement('span')
  header.classList.add('data-cell-header')
  header.appendChild(document.createTextNode(year))
  container.appendChild(header)
  container.appendChild(document.createElement('br'))
  container.appendChild(document.createTextNode(value))
  return container
}

const createUnemploymentData = (city) => {
  const createUnemplyomentCell = createDataCell(city)
  const container = document.createElement('div')
  container.appendChild(createUnemplyomentCell('Unemployment (2016)', 'Unemployment'))
  container.appendChild(createUnemplyomentCell('Women', 'WomenUnemployed2016'))
  container.appendChild(createUnemplyomentCell('Men', 'MenUnemployed2016'))
  return container
}


const createUniversityData = (city) => {
  const val = typeof(city.UniversityDegree) === 'number' ? Math.round(city.UniversityDegree * 100) / 100 : 'N/A'
  const container = document.createElement('div')
  container.classList.add('data-col')
  const header = document.createElement('span')
  header.classList.add('data-cell-header')
  header.appendChild(document.createTextNode('University graduates, %'))
  container.appendChild(header)
  container.appendChild(document.createElement('br'))
  container.appendChild(document.createTextNode(val))
  return container
}

const createDataCell = (city) => (name, attr) => {
  const value_ = city[attr] ? city[attr] : attr
  const value = typeof(value_) === "number" ? Math.round(city[attr] * 100) / 100 : value_
  const container = document.createElement('div')
  container.classList.add('data-col')
  const header = document.createElement('span')
  header.classList.add('data-cell-header')
  header.appendChild(document.createTextNode(name))
  container.appendChild(header)
  container.appendChild(document.createElement('br'))
  container.appendChild(document.createTextNode(value))
  return container
}


export default cityDetails
