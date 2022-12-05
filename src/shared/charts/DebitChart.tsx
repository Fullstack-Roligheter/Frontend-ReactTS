import 'chart.js/auto';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react'
import { useUserContext } from '../../context/UserContext'
import { GetDebitsForUser } from '../fetch/expense'
import { Typography } from '@mui/material';
 
 function DebitChart() {

    const user = useUserContext()
    const [debits, setDebits] = useState<any []>([])

    useEffect(() => {
      GetDebitsForUser(user.userId).then((Response) => {
        setDebits(Response)
      })
    }, [])

    const labels: any = [];
    const dataValues = [];
    
    for (let i = 0; i < debits.length; i++) {

        var then = new Date(debits[i].date);
        var now = new Date();
        const msBetweenDates = Math.abs(then.getTime() - now.getTime());
        const daysBetweenDates = msBetweenDates / (24 * 60 * 60 * 1000);

        if (!labels.includes(debits[i].category) && daysBetweenDates <= 30){
          labels.push(debits[i].category)
        }
    }
    
    for (let i = 0; i < labels.length; i++) {
      var sum = 0;

      debits.forEach(element => {
        var then = new Date(element.date);
        var now = new Date(); 
    
        const msBetweenDates = Math.abs(then.getTime() - now.getTime());
        const daysBetweenDates = msBetweenDates / (24 * 60 * 60 * 1000);

        if(element.category === labels[i] && daysBetweenDates <= 30){
          sum += element.amount;
        }
      });
  dataValues.push(sum)
}

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );

      const options: any = {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: 'top',
          },
          title: {
            display: true,
            text: 'Expenses for the last 30 days',
          },
        },
        maintainAspectRatio: false,
      };
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Categories',
            data: dataValues,
            backgroundColor: 'rgba(25, 118, 210, 1)',
          },
        ],
      };

    return (
    <div>
      {(() => {
        if (labels.length === 0) {
          return (
            <div style={{width: "500px", height: "300px", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
               <Typography variant ="h6">No expenses for the last 30 days</Typography>
            </div>
          )
        } else {
          return (
          <div style={{width: "500px", height: "300px"}}>
             <Bar options={options} data={data} />
          </div>
          )
        }
      })()}
    </div>
    )
}

export default DebitChart;
