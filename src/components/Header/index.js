import './index.css'
import { useState } from 'react'

const Header = (props) => {
    const {searchInput} = props
    const [input, changesearchInput] = useState('')
    
    const onChangeSearchInput = (event) => {
        changesearchInput(event.target.value)
    }

    const onEnterSearchInput = (event) => {
        if (event.key === 'Enter') {
            searchInput(input)
        }
    }

    const onClickButton = () => {
        searchInput(input)
    }

    return(
        <div className="header-container">
            <h1 className='heading'>Movie Name</h1>
            <input className='search-input' type="text" placeholder="Search movie name" onChange={onChangeSearchInput} value={input} onKeyDown={onEnterSearchInput}/>
            <button className='search-button' type='button' onClick={onClickButton}>Search!</button>
        </div>
    )
}
export default Header