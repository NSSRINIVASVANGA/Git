import './index.css'

const RepositoryItem = props => {
  const {details} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = details

  return (
    <li>
      <div className="card">
        <img src={avatarUrl} alt={name} className="avatar" />
        <h1 className="heading-2"> {name} </h1>
        <div className="extra">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            className="extra-img"
            alt="stars"
          />
          <p> {starsCount} stars </p>
        </div>
        <div className="extra">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            className="extra-img"
            alt="forks"
          />
          <p> {forksCount} froks </p>
        </div>
        <div className="extra">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            className="extra-img"
            alt="open issues"
          />
          <p> {issuesCount} open issues </p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
