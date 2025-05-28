import { useState } from 'react'
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import { Typography, Button, Paper } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BMI = () => {
  const [val, setVal] = useState({ Age: 0, Height: 0, Weight: 0 });
  const [bmi, setBmi] = useState(null);

  const To_calculate = () => {
    const calculatedBMI = val.Weight / ((val.Height / 100) ** 2);
    setBmi(calculatedBMI);
    console.log('BMI:', calculatedBMI);
  };

  const bmiData = [
    { label: 'תת-משקל', min: 0, max: 18.4, value: 10 },
    { label: 'תקין', min: 18.5, max: 24.9, value: 22 },
    { label: 'עודף משקל', min: 25, max: 29.9, value: 40 },
    { label: 'השמנה', min: 30, max: 100, value: 65 },
  ];

  const labels = bmiData.map((r) => r.label);
  const backgroundColors = bmiData.map((r) =>
    bmi >= r.min && bmi <= r.max ? '#f44336' : '#000'
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: 'BMI ממוצע',
        data: bmiData.map((r) => r.value),
        backgroundColor: backgroundColors,
        borderRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (context) => {
            const bmiVal = bmiData[context.dataIndex];
            if (bmi >= bmiVal.min && bmi <= bmiVal.max) {
              return [`BMI שלך: ${bmi.toFixed(1)}`];
            }
            return `ממוצע: ${bmiVal.value}`;
          },
        },
      },
      title: {
        display: bmi !== null,
        text: bmi !== null ? `ערך ה-BMI שלך: ${bmi.toFixed(1)}` : '',
        font: { size: 24 },
      },
    },
  };

  return (
    <div dir="rtl">
      <Stack spacing={5} alignItems="center">
        {/* גיל */}
        <Stack spacing={1} alignItems="center" sx={{ width: '50vh' }}>
          <Typography>גיל</Typography>
          <Slider
            value={val.Age}
            min={19}
            max={120}
            valueLabelDisplay="on"
            onChange={(e) => setVal({ ...val, Age: e.target.value })}
          />
        </Stack>

        {/* גובה */}
        <Stack spacing={1} alignItems="center" sx={{ width: '50vh' }}>
          <Typography>גובה (ס"מ)</Typography>
          <Slider
            value={val.Height}
            min={100}
            max={220}
            valueLabelDisplay="on"
            onChange={(e) => setVal({ ...val, Height: e.target.value })}
          />
        </Stack>

        {/* משקל */}
        <Stack spacing={1} alignItems="center" sx={{ width: '50vh' }}>
          <Typography>משקל (ק"ג)</Typography>
          <Slider
            value={val.Weight}
            min={30}
            max={150}
            valueLabelDisplay="on"
            onChange={(e) => setVal({ ...val, Weight: e.target.value })}
          />
        </Stack>

        <Button onClick={To_calculate} variant="contained">
          חישוב ה-BMI שלי
        </Button>

        {bmi && (
          <Paper sx={{ width: '90%', maxWidth: 700, p: 2 }}>
            <Bar data={chartData} options={chartOptions} />
          </Paper>
        )}
      </Stack>
    </div>
  );
};

export default BMI;
