const DummyTransactions = () => {
	const user1 = {
		userId: 1,
		transactions: [
			{
				id: 1,
				date: '2022-01-01',
				budget: 'Köksrenovering',
				article: 'Spis',
				summa: 10000,
			},
			{
				id: 2,
				date: '2022-02-02',
				budget: 'Allmänt',
				article: 'ICA Maxi',
				summa: 200,
			},
			{
				id: 3,
				date: '2022-03-03',
				budget: 'Köksrenovering',
				article: 'Kylskåp',
				summa: 3000,
			},
			{
				id: 4,
				date: '2022-04-04',
				budget: 'Allmänt',
				article: 'ICA Maxi',
				summa: 4000,
			},
			{
				id: 5,
				date: '2022-05-05',
				budget: 'Köksrenovering',
				article: 'Diskbänk',
				summa: 5000,
			},
		],
	}

	const user2 = {
		userId: 2,
		transactions: [
			{
				id: 11,
				date: '2022-11-11',
				budget: 'Köksrenovering',
				article: 'Spis',
				summa: 10000,
			},
			{
				id: 12,
				date: '2022-22-22',
				budget: 'Allmänt',
				article: 'ICA Maxi',
				summa: 200,
			},
			{
				id: 13,
				date: '2022-33-33',
				budget: 'Köksrenovering',
				article: 'Kylskåp',
				summa: 3000,
			},
			{
				id: 14,
				date: '2022-44-44',
				budget: 'Allmänt',
				article: 'ICA Maxi',
				summa: 4000,
			},
			{
				id: 15,
				date: '2022-55-55',
				budget: 'Köksrenovering',
				article: 'Diskbänk',
				summa: 5000,
			},
		],
	}

	return user1
}

export default DummyTransactions
