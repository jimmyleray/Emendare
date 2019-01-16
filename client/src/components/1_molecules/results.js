import React from 'react'
import { Doughnut } from 'react-chartjs-2'

const datasetDefault = {
  backgroundColor: [
    'hsla(141, 71%, 48%, 1)',
    'hsla(204, 86%, 53%, 1)',
    'hsla(348, 100%, 61%, 1)',
    'hsla(0, 0%, 21%, 1)'
  ],
  borderColor: 'white',
  borderWidth: 4,
  hoverBackgroundColor: [
    'hsla(141, 71%, 58%, 1)',
    'hsla(204, 86%, 63%, 1)',
    'hsla(348, 100%, 71%, 1)',
    'hsla(0, 0%, 31%, 1)'
  ],
  hoverBorderColor: 'white'
}

const options = {
  rotation: -Math.PI,
  circumference: Math.PI,
  legend: { display: false, position: 'bottom' },
  animation: { animateRotate: false },
  tooltips: { mode: 'point', displayColors: false }
}

const resolveData = data => {
  const res = {
    labels: ['Vote Pour', 'Vote Indifférent', 'Vote Contre', 'Abstention'],
    datasets: []
  }

  if (data.up || data.down) {
    res.datasets.push({
      label: 'UpAndDown',
      ...datasetDefault,
      data: [data.up || 0, 0, data.down || 0, 0]
    })
  }

  if (data.ind) {
    res.datasets.push({
      label: 'WithUnknow',
      ...datasetDefault,
      data: [data.up || 0, data.ind || 0, data.down || 0, 0]
    })
  }

  if (data.absent) {
    res.datasets.push({
      label: 'WithAbsent',
      ...datasetDefault,
      data: [data.up || 0, data.ind || 0, data.down || 0, data.absent || 0]
    })
  }

  return res
}

export const Results = ({ data }) => (
  <Doughnut data={resolveData(data)} options={options} />
)
