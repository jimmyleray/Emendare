import React from 'react'
import { Pie } from 'react-chartjs-2'

export const ResultsIcon = ({ data }) => (
  <div
    style={{
      height: '1.5rem',
      width: '1.5rem',
      display: 'inline-block',
      verticalAlign: 'middle'
    }}
  >
    <Pie
      data={{
        labels: ['Vote Pour', 'Vote Indifférent', 'Vote Contre', 'Abstention'],
        datasets: [
          {
            backgroundColor: [
              'hsla(141, 71%, 48%, 1)',
              'hsla(204, 86%, 53%, 1)',
              'hsla(348, 100%, 61%, 1)',
              'hsla(0, 0%, 21%, 1)'
            ],
            borderWidth: 0,
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
        aspectRatio: 1,
        legend: { display: false },
        animation: { animateRotate: false },
        tooltips: { enabled: false }
      }}
      width={24}
      height={24}
    />
  </div>
)
