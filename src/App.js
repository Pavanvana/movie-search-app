import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/Home';
import NotFound from './components/NotFound';
import EachMovieDetails from './components/EachMovieDetails';
import './App.css';

const App = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/movie/:id" component={EachMovieDetails}/>
        <Route  path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
    </Switch>
)

export default App;
