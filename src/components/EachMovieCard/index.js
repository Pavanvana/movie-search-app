import './index.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const EachMovieCard = (props) => {
    const {movieDetails} = props
    const {id,original_title,poster_path,release_date,overview,vote_average} = movieDetails
    return (
        <li key={id} className="each-item">
            <Link to={`/movie/${id}`} className="card-link">
                <img className='poster' src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt='poster'/>
                <div className='info-container'>
                    <h1 className='movie-title'>{original_title}</h1>
                    <p className='release-date'>RELEASE DATE: {release_date}</p>
                    <p className='rating'>RATING: {vote_average}</p>
                    <p className='overview'>{overview}</p>
                </div>
            </Link>
        </li>
    )
}
export default EachMovieCard