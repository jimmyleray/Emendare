import React from 'react'
import { Doughnut } from 'react-chartjs-2'

const datasetDefault = {
  backgroundColor: [
    'hsla(141, 71%, 48%, 1)',
    'hsla(204, 86%, 53%, 1)',
    'hsla(348, 100%, 61%, 1)',
    'hsla(0, 0%, 96%, 1)',
    'hsla(0, 0%, 21%, 1)'
  ],
  borderColor: 'white',
  borderWidth: 4,
  hoverBackgroundColor: [
    'hsla(141, 71%, 58%, 1)',
    'hsla(204, 86%, 63%, 1)',
    'hsla(348, 100%, 71%, 1)',
    'hsla(0, 0%, 86%, 1)',
    'hsla(0, 0%, 31%, 1)'
  ],
  hoverBorderColor: 'white'
}
export const Results = ({ data }) => (
  <div style={{ position: 'relative', zIndex: 1 }}>
    <Doughnut
      data={{
        labels: [
          'Votes "Pour"',
          'Votes "Indifférent"',
          'Votes "Contre"',
          'Votes exprimés',
          'Abstention'
        ],
        datasets: [
          {
            label: 'UpAndDown',
            ...datasetDefault,
            data: [
              data.up || data.down || data.ind ? data.up : 50,
              data.up || data.down || data.ind ? data.ind : 0,
              data.up || data.down || data.ind ? data.down : 50,
              0,
              0
            ]
          },
          {
            label: 'WithAbsent',
            ...datasetDefault,
            data: [0, 0, 0, data.up + data.ind + data.down, data.absent || 0]
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
