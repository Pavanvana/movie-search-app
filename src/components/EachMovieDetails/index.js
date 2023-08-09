import { Component } from "react"
import Loader from 'react-loader-spinner'
import {IoMdStar} from 'react-icons/io'
import {BiLike,BiSolidLike} from 'react-icons/bi'
import {AiOutlineArrowRight} from 'react-icons/ai'
import './index.css'

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
  }
  

class EachMovieDetails extends Component {
    state = {
        apiStatus: apiStatusConstants.initial,
        movieDetails : "",
        isLiked: false
    }
    componentDidMount = () => {
        this.getMovieDetails()
    }
    getMovieDetails = async () => {
        const {match} = this.props
        const {params} = match
        const {id} = params
        this.setState({
          apiStatus: apiStatusConstants.inProgress,
        })
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=7e567551bc8e823297f53d17e2514b43`
        const options = {
            method: 'GET'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.ok){
            this.setState({movieDetails: data, apiStatus: apiStatusConstants.success})
        }else{
            this.setState({apiStatus: apiStatusConstants.failure})
        }
    }
    onClickReTry = () => {
        this.getMovieDetails()
    }    
    renderFailureView = () => (
        <div className="failure-container">
            <img
            src="https://res.cloudinary.com/daflxmokq/image/upload/v1677128965/alert-triangle_yavvbl.png"
            alt="failure view"
            className="failure view"
            />
            <p className="alert-msg">Something went wrong. Please try again</p>
            <button
            className="tryagain-btn"
            type="button"
            onClick={this.onClickReTry}
            >
            Try again
            </button>
        </div>
    )

    renderLoadingView = () => (
        <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
        </div>
    )

    onClickLikeBtn = () => {
        const {movieDetails} = this.state
        movieDetails.vote_count += 1 
        this.setState({movieDetails, isLiked: true})
    }

    onClickUnLikeBtn = () => {
        const {movieDetails} = this.state
        movieDetails.vote_count -= 1 
        this.setState({movieDetails, isLiked: false})
    }

    renderSuccessView = () => {
        const {movieDetails,isLiked} = this.state
        console.log(movieDetails)
        const {backdrop_path,overview,budget,homepage,title,popularity,release_date,runtime,vote_average,vote_count,production_companies} = movieDetails
        return(
            <div className="movie-details-container">
                <img className="movie-picture" src={`https://image.tmdb.org/t/p/w500${backdrop_path}`} alt="movie-poster"/>
                <div className="movie-info-container">
                    <div>
                        <h1 className="movie-title">{title}</h1>
                        <p className="release-date">RELEASE DATE: <span className="span">{release_date}</span></p>
                        <p className="release-date">BUDGET: <span className="span">{budget} $</span></p>
                        <p className="release-date">DURATION: <span className="span">{runtime}</span> Minutes</p>
                        <p className="release-date">POPULARITY: <span className="span">{popularity}</span></p>
                        <p className="overview">{overview}</p>
                    </div>
                    <div className="rating-container">
                        <div className="tmp">
                            <p className="vote-average">{vote_average}</p>
                            <IoMdStar size={20} color="orange"/>
                        </div>
                        <div className="tmp">
                            {isLiked ? 
                                <button type="button" className="like-btn" onClick={this.onClickUnLikeBtn}><BiSolidLike size={25}/></button>
                                :
                                <button type="button" className="like-btn" onClick={this.onClickLikeBtn}><BiLike size={25}/></button>
                            }
                            <p className="vote-count">{vote_count}</p>
                        </div>
                    </div>
                </div>
                <h2 className="production-companies-heading">Production Companies</h2>
                <ul className="production-companies-container">
                    {production_companies.map(each => (
                        <li className="each-company-card" key={each.id}>
                            <img className="company-logo" src={`https://image.tmdb.org/t/p/w500${each.logo_path}`} alt="logo"/>
                            <p className="company-name">NAME: <span className="span">{each.name}</span></p>
                            <p className="company-name">COUNTRY: <span className="span">{each.origin_country}</span></p>
                        </li>
                    ))}
                </ul>
                <a className="anchor-el" href={homepage}>View More <AiOutlineArrowRight className="arrow-icon"/></a>
            </div>
        )
    }

    onRenderMovies= () => {
        const {apiStatus} = this.state
        switch (apiStatus) {
          case apiStatusConstants.success:
              return this.renderSuccessView()
          case apiStatusConstants.failure:
              return this.renderFailureView()
          case apiStatusConstants.inProgress:
              return this.renderLoadingView()
          default:
              return null
          }
    }


    render(){
        return(
            <>
                {this.onRenderMovies()}
            </>
        )
    }
}
export default EachMovieDetails