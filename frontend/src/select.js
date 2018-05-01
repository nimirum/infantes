const createSelect = (props, targetElementId) => {
  window.handleSelectChange = props.handleSelectChange
  const container = document.createElement('div')
  const select  = document.createElement('select')
  const options = props.options ? props.options : []
  options.map((opt) => {
    const option = document.createElement('option')
    option.setAttribute('value', opt)
    option.appendChild(document.createTextNode(opt))
    select.appendChild(option)
  })
  select.setAttribute('onchange', 'handleSelectChange(value)')
  const targetElement = document.getElementById(targetElementId)
  container.appendChild(select)
  targetElement.appendChild(container)
}


export default createSelect
