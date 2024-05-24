import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  fail: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    langsList: [],
    clickedId: languageFiltersData[0].id,
    activeLang: languageFiltersData[0].language,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getLanguagesList()
  }

  getSuccesResult = data => {
    const updatedData = data.popular_repos.map(eachrepo => ({
      id: eachrepo.id,
      name: eachrepo.name,
      issuesCount: eachrepo.issues_count,
      forksCount: eachrepo.forks_count,
      starsCount: eachrepo.stars_count,
      avatarUrl: eachrepo.avatar_url,
    }))
    this.setState({
      langsList: updatedData,
      apiStatus: apiStatusConstants.success,
    })
  }

  getFailureResult = () => {
    this.setState({apiStatus: apiStatusConstants.fail})
  }

  getLanguagesList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeLang} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeLang}`
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok === true) {
      this.getSuccesResult(data)
    } else {
      this.getFailureResult()
    }
  }

  onSelect = (id, lang) => {
    this.setState({clickedId: id, activeLang: lang}, this.getLanguagesList)
  }

  success = () => {
    const {clickedId, langsList} = this.state
    return (
      <div className="main-container">
        <h1 className="heading"> Popular </h1>
        <ul className="list-container">
          {languageFiltersData.map(eachLang => (
            <LanguageFilterItem
              details={eachLang}
              key={eachLang.id}
              clickedId={clickedId}
              onSelect={this.onSelect}
            />
          ))}
        </ul>
        <ul className="items-con">
          {langsList.map(eachLang => (
            <RepositoryItem details={eachLang} key={eachLang.id} />
          ))}
        </ul>
      </div>
    )
  }

  failure = () => {
    const {clickedId} = this.state
    return (
      <div className="main-container">
        <h1 className="heading"> Popular </h1>
        <ul className="list-container">
          {languageFiltersData.map(eachLang => (
            <LanguageFilterItem
              details={eachLang}
              key={eachLang.id}
              clickedId={clickedId}
              onSelect={this.onSelect}
            />
          ))}
        </ul>
        <div className="err-con">
          <img
            src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
            alt="failure view"
            className="err-img"
          />
          <h1 className="heading-1"> Something Went Wrong </h1>
        </div>
      </div>
    )
  }

  progress = () => {
    const {clickedId} = this.state
    return (
      <div className="main-container">
        <h1 className="heading"> Popular </h1>
        <ul className="list-container">
          {languageFiltersData.map(eachLang => (
            <LanguageFilterItem
              details={eachLang}
              key={eachLang.id}
              clickedId={clickedId}
              onSelect={this.onSelect}
            />
          ))}
        </ul>
        <div data-testid="loader">
          <Loader type="ThreeDots" color="#0284c7" width={80} height={80} />
        </div>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.success()
      case apiStatusConstants.fail:
        return this.failure()
      case apiStatusConstants.inProgress:
        return this.progress()
      default:
        return null
    }
  }
}

export default GithubPopularRepos
