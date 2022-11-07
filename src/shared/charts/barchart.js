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
 
 function BarChart() {
      
    const user = useUserContext()
      const [categories, setCategories] = useState([])
    
      function getCategories() {
        GetCategoriesForUser(user.userId).then((Response) => {
          setCategories(Response)
        })
      }
    
    //Get categories for user to put in select
    useEffect(() => {
        GetCategoriesForUser(user.userId).then((Response) => {
          setCategories(Response)
        })
      }, [])

    console.log(categories)

    const labels = [];
      
    for (let i = 0; i < categories.length; i++) {
        labels.push(categories[i].categoryName)
      }

    //   categories.forEach(category => {
    //       console.log(category.categoryName)
    //   });

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
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
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
