const createSelect = (props, targetElementId) => {
  window.handleSelectChange = props.handleSelectChange
  const select  = document.createElement('select')
  const options = props.options ? props.options : []
  options.map((opt) => {
    const option = document.createElement('option')
    option.setAttribute('value', opt)
    option.appendChild(document.createTextNode(opt))
    select.appendChild(option)
  })
  select.setAttribute('class', 'custom-select')
  select.setAttribute('onchange', 'handleSelectChange(value)')
  const targetElement = document.getElementById(targetElementId)
  targetElement.appendChild(select)
}


export default createSelect
