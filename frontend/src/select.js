const createSelect = (options, targetElementId, onchangeHandlerName, attributesToString) => {
  console.log(targetElementId)
  const select  = document.createElement('select')
  const options_ = options ? options : []
  options_.map((opt) => {
    const option = document.createElement('option')
    option.setAttribute('value', opt)
    option.appendChild(document.createTextNode(attributesToString[opt]))
    select.appendChild(option)
  })
  select.setAttribute('class', 'custom-select')
  select.setAttribute('onchange', onchangeHandlerName)
  const targetElement = document.getElementById(targetElementId)
  targetElement.appendChild(select)
}


export default createSelect
