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
import { GetDebitsForUser } from '../../shared/fetch/expense'
 
 function DebitChart() {

    const user = useUserContext()
    const [debits, setDebits] = useState([])

    useEffect(() => {
      GetDebitsForUser(user.userId).then((Response) => {
        setDebits(Response)
        console.log(Response)
      })
    }, [])

    const labels = [];
    const dataValues = [];
    
    console.log(debits)
    
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

      
      const options = {
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
            <div style={{width: "500px", height: "300px"}}>
                <Bar options={options} data={data}
            />
            </div>
        </div>
    )
}

export default DebitChart;
