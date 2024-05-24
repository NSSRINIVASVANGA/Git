import './index.css'

const LanguageFilterItem = props => {
  const {details, clickedId, onSelect} = props
  const {id, language} = details
  const calssVal = clickedId === id ? 'lng-btn-click' : 'lng-btn'

  const clicked = () => {
    onSelect(id, language)
  }
  return (
    <li>
      <button className={calssVal} onClick={clicked} type="button">
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
