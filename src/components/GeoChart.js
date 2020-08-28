import React from 'react'
import useResizeObserver from '../hooks/useResizeObserver'
import { select, min, max, scaleLinear, geoMercator, geoPath } from 'd3'

export const GeoChart = ({ data, property, fetchData, menu, handleMenu }) => {
  const svgRef = React.useRef()
  const wrapperRef = React.useRef()
  const dimensions = useResizeObserver(wrapperRef)
  const [selectedCountry, setSelectedCountry] = React.useState(null)

  React.useEffect(() => {
    const svg = select(svgRef.current)

    const minProp = min(data.features, feature => feature.properties[property])
    const maxProp = max(data.features, feature => feature.properties[property])
    const colorScale = scaleLinear()
      .domain([minProp, maxProp])
      .range(['#232123', '#95C254'])

    // use resized dimensions
    // but fall back to getBoundingClientRect, if no dimensions yet.
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()

    // projects geo-coordinates on a 2D plane
    const projection = geoMercator()
      .fitSize([width, height], selectedCountry || data)
      .precision(100)

    // takes geojson data,
    // transforms that into the d attribute of a path element
    const pathGenerator = geoPath().projection(projection)

    // render each country
    svg
      .selectAll('.country')
      .data(data.features)
      .join('path')
      .on('click', feature => {
        setSelectedCountry(selectedCountry === feature ? null : feature)
      })
      .attr('class', 'country')
      .transition()
      .attr('fill', feature => colorScale(feature.properties[property]))
      .attr('d', feature => pathGenerator(feature))

    // render text
    svg
      .selectAll('.label')
      .data([selectedCountry])
      .join('text')
      .attr('class', 'label')
      .text(
        feature =>
          feature &&
          // console.log(selectedCountry) &&
          fetchData(feature.properties.name) &&
          handleMenu(true) &&
          feature.properties.name +
            ': ' +
            feature.properties[property].toLocaleString()
      )
      .attr('x', 10)
      .attr('y', 25)
  }, [data, dimensions, property, selectedCountry])

  return (
    <div ref={wrapperRef} className='mapContainer'>
      <svg ref={svgRef} />
    </div>
  )
}
