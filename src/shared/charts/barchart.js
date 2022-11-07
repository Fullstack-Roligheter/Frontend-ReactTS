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
import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react'
import { useUserContext } from '../../context/UserContext'
import { GetCategoriesForUser } from '../../shared/fetch/category'
import { GetDebitsForUser } from '../../shared/fetch/expense'
 
 function BarChart() {

    const user = useUserContext()


    const [debits, setDebits] = useState([])

    //Get all debits to put in list
    useEffect(() => {
      GetDebitsForUser(user.userId).then((Response) => {
        setDebits(Response)
      })
    }, [])

    const labels = [];
    const dataValues = [];
    var sum;

    for (let i = 0; i < debits.length; i++) {
        if (!labels.includes(debits[i].category)){
            labels.push(debits[i].category)
            dataValues.push(debits[i].amount)
            
        }

        // console.log("Amount: " + debits[i].amount + " Category: " + debits[i].category)// 
    }

    // labels.forEach(label => {
    //     debits.forEach(element => {
    //         if (element.category === label) {
    //             sum += element.amount
    //         }
    //     });
    //     dataValues.push(sum)
    // });
    

    const [categories, setCategories] = useState([])
    
    useEffect(() => {
        GetCategoriesForUser(user.userId).then((Response) => {
          setCategories(Response)
        })
      }, [])

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
            position: 'top',
          },
          title: {
            display: true,
            text: 'Expense Oversight',
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
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };

    return (
        <div>
            <div style={{width: "600px", height: "400px"}}>
                <Bar options={options} data={data}
            />
            </div>
        </div>
    )
}

export default BarChart;
