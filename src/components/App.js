import React, { useReducer, useEffect } from 'react';
import '../App.css';
import Header from './Header'
import Movie from './Movie'
import Search from './Search'


const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b"; // you should replace this with yours

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_MOVIES_REQUEST':
      return {
        ...state,
        loading: true,
        errorMessage: null
      }
    case 'SEARCH_MOVIES_SUCCESS':
      return {
        ...state,
        loading: false,
        movies: action.payload
      }
    case 'SEARCH_MOVIES_FAILURE':
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      }
      default:
        return state
  }
}

const App = () => {
  // const [loading, setLoading] = useState(true)
  // const [movies, setMovies] = useState([])
  // const [errorMessage, setErrorMessage] = useState(null)

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(res => res.json())
      .then(res => {
        // setMovies(res.Search)
        // setLoading(false)
        dispatch({
          type: 'SEARCH_MOVIES_SUCCESS',
          payload: res.Search
        })
      })
  }, [])

  const search = searchValue => {
    // setLoading(true)
    // setErrorMessage(null)
    dispatch({
      type: 'SEARCH_MOVIES_REQUEST'
    })

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then(res => res.json())
      .then(res => {
        if (res.Response === 'True') {
          // setMovies(res.Search)
          // setLoading(false)
          dispatch({
            type: 'SEARCH_MOVIES_FAILURE',
            payload: res.Error
          })
        } else {
          // setErrorMessage(res.Error)
          // setLoading(false)
          dispatch({
            type: 'SEARCH_MOVIES_SUCCESS',
            payload: res.Search
          })
        }
      })
  }

  const {movies, errorMessage, loading} = state

  return (
    <div className="App">
      <Header text="HOOKED"></Header>
      <Search search={search}></Search>
      <p className="app-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
              movies.map((movie, index) => (
                <Movie key={`${index}-${movie.Title}`} movie={movie}></Movie>
              ))
            )}
      </div>
    </div>
  )
}
export default App