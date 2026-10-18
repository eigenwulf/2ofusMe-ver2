'use client'
import { BarChart } from '@mui/x-charts/BarChart';

const dataset = [
  { date: 'Jan 2026', confirmedMailings: 20},
  {date: 'Feb 2026', confirmedMailings: 30},
  { date: 'Mar 2026', confirmedMailings: 40},
  { date: 'Apr 2026', confirmedMailings: 50},
    { date: 'May 2026', confirmedMailings: 60},
      { date: 'June 2026', confirmedMailings: 20}
]


const chartSetting = {
  yAxis: [
    {
      label: 'Confirmed Mailings',
      width: 60,
    },
  ],
  height: 300,
  margin: { bottom: 70 },
};

export default function BarsDataset() {
  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ dataKey: 'date', scaleType: 'band', tickLabelStyle: { angle: -35, textAnchor: 'end', fontSize: 12 }, }]}
      series={[
        { dataKey: 'confirmedMailings', label: 'Confirmed Mailings' },
      ]}
      {...chartSetting}
    />
  );
}