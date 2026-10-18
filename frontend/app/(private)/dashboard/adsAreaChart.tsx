'use client'

import Box from '@mui/material/Box';
import { BarPlot } from '@mui/x-charts/BarChart';
import { LineHighlightPlot, LinePlot } from '@mui/x-charts/LineChart';
import { ChartsContainer } from '@mui/x-charts/ChartsContainer';
import { AllSeriesType } from '@mui/x-charts/models';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';
import { ChartsAxisHighlight } from '@mui/x-charts/ChartsAxisHighlight';

// const chartdata = [
//   { date: new Date(2023, 0),  ConfirmedMailings: 20, BrandAwareness: 10,},
//   { date: new Date(2023, 1), ConfirmedMailings: 20, BrandAwareness: 20,},
//   { date: new Date(2023, 2), ConfirmedMailings: 30, BrandAwareness: 30, },
//   { date: new Date(2023, 3), ConfirmedMailings: 50, BrandAwareness: 40, },
//   { date: new Date(2023, 4), ConfirmedMailings: 100, BrandAwareness: 60,},
//   { date: new Date(2023, 5), ConfirmedMailings: 30, BrandAwareness: 75,},
//   { date: new Date(2023, 6), ConfirmedMailings: 50, BrandAwareness: 90, },
//   { date: new Date(2023, 7), ConfirmedMailings: 78, BrandAwareness: 120, },
//   { date: new Date(2023, 8), ConfirmedMailings: 90, BrandAwareness: 160, },
//   { date: new Date(2023, 9), ConfirmedMailings: 100, BrandAwareness: 200, },
//   { date: new Date(2023, 10), ConfirmedMailings: 25, BrandAwareness: 220, },
//   { date: new Date(2023, 11), ConfirmedMailings: 10, BrandAwareness: 250,  },
//   ]

const chartdata = [
  { date: 'Jan 2026',  ConfirmedMailings: 20, BrandAwareness: 10,},
  { date: 'Feb 2026', ConfirmedMailings: 20, BrandAwareness: 20,},
  { date: 'Mar 2026', ConfirmedMailings: 30, BrandAwareness: 30, },
  { date: 'Apr 2026', ConfirmedMailings: 50, BrandAwareness: 40, },
  ]



const series = [
  {
    type: 'bar',
    yAxisId: 'mailings',
    label: 'Confirmed Mailings',
    color: 'lightgray',
    data: chartdata.map((i) => i.ConfirmedMailings),
    highlightScope: { highlight: 'item' },
  },
  // {
  //   type: 'line',
  //   yAxisId: 'brandawareness',
  //   color: 'red',
  //   label: 'Brand Awareness',
  //   data: chartdata.map((i) => i.BrandAwareness),
  //   highlightScope: { highlight: 'item' },
  // },
] as AllSeriesType[];


export default function AdsAreaChart() {
  return (
    <Box sx={{ width: '100%', height: 400 }}>

      <ChartsContainer
        series={series}
        xAxis={[
          {
            id: 'date',
            // data: chartdata.map((i) => i.date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })),
            data: chartdata.map((i) => i.date),
            scaleType: 'band',
            // valueFormatter: (value) => value.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
            height: 48,
          },
        ]}
        yAxis={[
          { id: 'mailings', scaleType: 'linear', position: 'left', width: 50 },
          // {
          //   id: 'brandawareness',
          //   scaleType: 'linear',
          //   position: 'right',
          //   valueFormatter: (value) => `${(value / 1000000).toLocaleString()}M`,
          //   width: 55,
          // },
        ]}
      >
        <ChartsAxisHighlight x="line" />
        <BarPlot />

        <LineHighlightPlot />
        <ChartsXAxis
          label="Date"
          axisId="date"
          tickInterval={(value, index) => true} 
          tickLabelStyle={{fontSize: 10,}}
        />
        <ChartsYAxis
          label="Confirmed Mailings"
          axisId="mailings"
          tickLabelStyle={{ fontSize: 10 }}
        />
        {/* <ChartsYAxis
          label="Brand Awareness"
          axisId="brandawareness"
          tickLabelStyle={{ fontSize: 10 }}
        /> */}
        <ChartsTooltip />

      </ChartsContainer>



    </Box>


)}
