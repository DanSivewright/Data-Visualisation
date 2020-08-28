import React from 'react'
import { select, line, axisBottom, scaleLinear } from 'd3'

export const LineChart = ({ contData }) => {
  const [data, setData] = React.useState([10, 50, 30, 40, 20, 70, 50])
  const svgRef = React.useRef()

  React.useEffect(() => {
    const svg = select(svgRef.current)

    // Axis setup
    const xScale = scaleLinear().domain([0, data.length - 1]).range([0, 600])
    const yScale = scaleLinear().domain([0, 80]).range([150, 0])
    const xAxis = axisBottom(xScale)

    svg
      .select('.x-axis')
      .style('transform', 'translateY(149px)')
      .call(xAxis)

    // Line graph setup
    const lineGraph = line()
      .x((value, index) => xScale(index))
      .y(yScale)

    svg
      .selectAll('.line')
      .data([data])
      .join('path')
      .attr('class', 'line')
      .attr('d', value => lineGraph(value))
      .attr('fill', 'none')
      .attr('stroke', 'red')
  }, [data])
  return (
    <div>
      <svg
        ref={svgRef} style={{
          width: '100%'
        }}
      >
        <g className='x-axis' />
      </svg>
    </div>
  )
}
