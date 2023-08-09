import { Component } from "react";
import Header from '../Header'
import EachMovieCard from "../EachMovieCard";
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}

class Home extends Component{
    state = {
        searchInput: '',
        moviesList: [],
        apiStatus: apiStatusConstants.initial
    }
    componentDidMount = () => {
        this.getMoviesList()
    }
    getMoviesList = async () => {
        this.setState({apiStatus: apiStatusConstants.inProgress})
        const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=7e567551bc8e823297f53d17e2514b43"
        const options = {
            method: 'GET'
        }
        const response = await fetch(API_URL, options)
        const data = await response.json()
        const moviesList = data.results
        moviesList.sort((a, b) => new Date(a.release_date) < new Date(b.release_date) ? 1 : -1)
        if (response.ok) {
            this.setState({moviesList: [...moviesList], apiStatus: apiStatusConstants.success})
        }else{
            this.setState({apiStatus: apiStatusConstants.failure})
        }
    }
    onChangeSearchInput = async(input) => {
        if (input === ""){
            this.getMoviesList()
        }else{
            this.setState({apiStatus: apiStatusConstants.inProgress})
            const API_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=7e567551bc8e823297f53d17e2514b43&query=${input}`
            const options = {
                method: 'GET'
            }
            const response = await fetch(API_SEARCH, options)
            const data = await response.json()
            const moviesList = data.results
            moviesList.sort((a, b) => new Date(a.release_date) < new Date(b.release_date) ? 1 : -1)
            if (response.ok) {
                this.setState({moviesList: [...moviesList], apiStatus: apiStatusConstants.success})
            }else{
                this.setState({apiStatus: apiStatusConstants.failure})
            }
        }
    }

    onClickReTry = () => {
        this.getMoviesList()
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
  
    renderSuccessView = () => {
        const {moviesList} = this.state
        return(
            <>
                {moviesList.length > 0 ?
                    <ul className="movies-list-container">
                        {moviesList.map(eachMovie => (
                            <EachMovieCard key={eachMovie.id} movieDetails={eachMovie}/>
                        ))}
                    </ul>
                    :
                    <div className="not-found-container">
                        <img
                        src="https://res.cloudinary.com/daflxmokq/image/upload/v1677136867/Group_a31ngd.png"
                        alt="search not found"
                        className="not-found-img"
                        />
                        <h1 className="not-found-heading">Search Not Found</h1>
                        <p className="not-found-description">
                        Try different keyword or search again
                        </p>
                    </div>
                }
            </>
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
            <div className="app-container">
                <div className="main-container">
                    <Header searchInput={this.onChangeSearchInput}/>
                    {this.onRenderMovies()}
                </div>
            </div>
        )
    }
}
export default Home