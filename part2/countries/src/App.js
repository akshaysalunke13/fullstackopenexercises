import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
    const [countries, setCountries] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const handleSearch = (event) => setSearch(event.target.value)

    return (
        <>
            <h2>Countries</h2>
            <h3>Search</h3><input value={search} onChange={handleSearch} />
            <Countries countries={countries} search={search} />
        </>
    )
}

const Countries = ({ countries, search }) => {
    const filteredCountries = countries.filter(country => {
        return country.name.toLowerCase().indexOf(search.toLowerCase()) >= 0 ? true : false
    })

    if (filteredCountries.length > 10) {
        return <div>Too many countries. Be more specific in the query.</div>
    } else if (filteredCountries.length === 1) {
        return (<CountryDetails country={filteredCountries[0]} key={filteredCountries[0].id}/>)
    }

    return (
        filteredCountries.map(country => <Country country={country} key={country.id}/>)
    )
}

const Country = ({ country }) => {
    const [showDetails, setShowDetails] = useState(false)
    const showButtonHandler = () => setShowDetails(!showDetails)

    const countryDetails = <CountryDetails country={country} />

    return (<div>{country.name}<button onClick={showButtonHandler}>{showDetails ? 'hide' : 'show'}</button>{showDetails ? countryDetails : null}</div>)
}

const CountryDetails = ({ country }) => {
    const [weather, setWeather] = useState('')
    const api_key = process.env.REACT_APP_API_KEY

    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current`, { params: { access_key: api_key, query: country.capital } })
            .then(response => setWeather(response.data.current))
    }, [api_key, country])

    return (
        <div key={country.id}>
            <h1>{country.name}</h1>
            Capital: {country.capital}<br />
            Population: {country.population}<br />
            Languages:
            <ul>
                {country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
            </ul>
            Flag:<br />
            <img src={country.flag} width='320' height='320' alt='flag'/><br/>
            Weather at {country.capital}:
            {weather.temperature} <strong>C</strong><br/>
            Wind: {weather.wind_speed} in {weather.wind_dir} direction.<br/>
        </div>
    )
}

export default App