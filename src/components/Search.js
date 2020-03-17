import React, { useState } from "react";

const Search = (props) => {
    const [searchValue, setSearchValue] = useState("")

    const callSearchFunction = (e) => {
        e.preventDefault()
        props.search(searchValue)
        setSearchValue('')
    }

    return (
        <form className="search">
            <input
                defaultValue={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                type="text"/>
            <button
                onClick={callSearchFunction}
                type="Submit">SEARCH</button>

        </form>
    )
}

export default Search