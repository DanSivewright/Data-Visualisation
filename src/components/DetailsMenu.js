import React from 'react'
import { GlobalStats } from './GlobalStats'
import Axios from 'axios'

export const DetailsMenu = ({ countryData, loading, handleMenu, menu }) => {

  return (
    <div className={countryData && menu ? 'detailsMenu' : 'detailsMenu--hidden'}>
      {countryData ? (
        !loading && menu ? (
          <>
            <h2 className='close' onClick={() => handleMenu(false) & console.log('Close me')}>x</h2>
            <h2 className='countryTitle'>{countryData.country}</h2>
            <p className='cont'>{countryData.continent}</p>
            <p className='stat'><span>Population: </span>{new Intl.NumberFormat().format(countryData.population)}</p>
            <p className='stat'><span>Cases: </span>{new Intl.NumberFormat().format(countryData.cases)}</p>
            <p className='stat'><span>Deaths: </span>{new Intl.NumberFormat().format(countryData.deaths)}</p>
            <p className='stat'><span>Recovered: </span>{new Intl.NumberFormat().format(countryData.recovered)}</p>
            <p className='stat'><span>Critical: </span>{new Intl.NumberFormat().format(countryData.critical)}</p>

            <h2 className='todayTitle'>Todays Statistics</h2>
            <p className='stat today'><span>Cases Today: </span>{new Intl.NumberFormat().format(countryData.todayCases)}</p>
            <p className='stat today'><span>Deaths Today: </span>{new Intl.NumberFormat().format(countryData.todayDeaths)}</p>
            <p className='stat today'><span>Recovered Today: </span>{new Intl.NumberFormat().format(countryData.todayRecovered)}</p>

            <h2 className='todayTitle'>Continent Stats</h2>
            <GlobalStats cont={countryData.country} />
          </>
        ) : !menu ? '' : <p className='loading'>Loading...</p>
      ) : (
        <>
          <p className='title'>Please Select a country</p>
          <p className='key'>Countries GDP are show according to green</p>
        </>
      )}
    </div>
  )
}
