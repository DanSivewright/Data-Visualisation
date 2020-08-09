import React from 'react'
import { select } from 'd3'

export const CircleChart = () => {
  const [data, setData] = React.useState([10, 50, 30, 40, 20, 70, 50])

  const svgRef = React.useRef()

  React.useEffect(() => {
    const svg = select(svgRef.current)
    svg
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('r', v => v)
      .attr('cx', x => x * 2)
      .attr('cy', x => x * 2)
      .attr('stroke', 'red')
  }, [data])
  return (
    <div>
      <h2>Circle Chart Testing</h2>
      <svg ref={svgRef} />
      <br />
      <button
        onClick={() => setData(data.map(v => v + 5))}
      >
        Update Data
      </button>
      <button
        onClick={() => setData(data.filter(v => v <= 35))}
      >
        Filter Data
      </button>
    </div>
  )
}
