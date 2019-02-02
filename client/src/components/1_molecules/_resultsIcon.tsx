import React from 'react'
import { Pie } from 'react-chartjs-2'

export const ResultsIcon = ({ data }: { data: any }) => (
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
        labels: [
          'Votes Pour',
          'Votes Indifférent',
          'Votes Contre',
          'Votes exprimés',
          'Abstention'
        ],
        datasets: [
          {
            backgroundColor: [
              'hsla(141, 71%, 48%, 1)',
              'hsla(204, 86%, 53%, 1)',
              'hsla(348, 100%, 61%, 1)',
              'hsla(0, 0%, 21%, 1)',
              'hsla(0, 0%, 96%, 1)'
            ],
            hoverBackgroundColor: [
              'hsla(141, 71%, 58%, 1)',
              'hsla(204, 86%, 63%, 1)',
              'hsla(348, 100%, 71%, 1)',
              'hsla(0, 0%, 31%, 1)',
              'hsla(0, 0%, 86%, 1)'
            ],
            borderWidth: 0,
            data: [
              data.up || 0,
              data.ind || 0,
              data.down || 0,
              0,
              !data.up && !data.ind && !data.down ? data.absent : 0
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
