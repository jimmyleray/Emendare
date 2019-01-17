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
export const Results = ({ data }) => (
  <div style={{ position: 'relative', zIndex: 1 }}>
    <Doughnut
      data={{
        labels: ['Vote Pour', 'Vote Indifférent', 'Vote Contre', 'Abstention'],
        datasets: [
          {
            label: 'UpAndDown',
            ...datasetDefault,
            data: [
              data.up || data.down ? data.up : 50,
              0,
              data.up || data.down ? data.down : 50,
              0
            ]
          },
          {
            label: 'WithAbsent',
            ...datasetDefault,
            data: [
              data.up || 0,
              data.ind || 0,
              data.down || 0,
              data.absent || 0
            ]
          }
        ]
      }}
      options={{
        rotation: -Math.PI,
        circumference: Math.PI,
        legend: { display: false },
        animation: { animateRotate: false },
        tooltips: { mode: 'point', displayColors: false }
      }}
    />
  </div>
)
