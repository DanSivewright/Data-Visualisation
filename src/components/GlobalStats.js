import React from 'react'
import Axios from 'axios'
import { LineChart } from './line/LineChart'

export const GlobalStats = ({ cont }) => {
  // /v3/covid-19/continents/{continent}
  const [contData, setContData] = React.useState(null)

  React.useEffect(() => {
    Axios.get(`https://disease.sh/v3/covid-19/historical/${cont}`).then(res => {
      setContData(res.data.timeline)
      console.log(res.data.timeline)
    })
  }, [])

  return (
    <div>
      {contData ? (
        <LineChart contData={contData} />
      ) : (
        'Loading...'
      )}
    </div>
  )
}
