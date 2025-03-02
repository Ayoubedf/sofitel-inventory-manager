import { Helmet } from 'react-helmet-async';
import Card from '../components/card';
const APP_NAME = import.meta.env.VITE_APP_NAME;

const DashBoard = () => {
	const cards = [
		{
			title: 'products nearing depletion',
			imageSrc: 'images/category/desktop.jpg',
			span: 1,
		},
		{
			title: 'recent added products',
			imageSrc: 'images/category/desktop.jpg',
			span: 2,
		},
		{ title: 'activity log', imageSrc: 'images/category/desktop.jpg', span: 2 },
		// {
		// 	title: 'most wanted products',
		// 	imageSrc: 'images/category/desktop.jpg',
		// 	span: 1,
		// },
	];
	return (
		<>
			<Helmet>
				<title>Dashboard | {APP_NAME}</title>
			</Helmet>
			{cards.map((card) => (
				<Card card={card} key={card.title} />
			))}
		</>
	);
};

export default DashBoard;
