import React from 'react'
import { GeoChart } from './components/GeoChart'
import data from './GeoChart.world.geo.json'
import Axios from 'axios'
import { DetailsMenu } from './components/DetailsMenu'

export const App = () => {
  const [property, setProperty] = React.useState('gdp_md_est')
  const [countryData, setCountryData] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [menu, setMenu] = React.useState(false)

  const FetchData = async (country) => {
    setLoading(true)
    const countryData = await Axios.get(`https://disease.sh/v3/covid-19/countries/${country}`)
    setCountryData(countryData.data)
    setLoading(false)
    setMenu(true)
  }

  const handleMenu = () => {
    setMenu(false)
  }

  return (
    <>
      {loading ? 'loading...' : <DetailsMenu countryData={countryData} menu={menu} handleMenu={handleMenu} />}
      <GeoChart
        data={data}
        property={property}
        fetchData={FetchData}
        menu={menu}
        handleMenu={handleMenu}
        style={{
          width: '100vw',
          height: '100vh',
          background: 'red'
        }}
      />
      {/* <select
        value={property}
        onChange={event => setProperty(event.target.value)}
      >
        <option value='pop_est'>Population</option>
        <option value='name_len'>Name length</option>
        <option value='gdp_md_est'>GDP</option>
      </select> */}
    </>
  )
}
