import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import Card from '../components/card';
import Table from '../components/table';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import Spinner from '@/components/ui/spinner';
import { Helmet } from 'react-helmet-async';
const APP_NAME = import.meta.env.VITE_APP_NAME;

const Category = () => {
	const { cat: category } = useParams();
	const [items, setItems] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const axiosPrivate = useAxiosPrivate();
	const isMounted = useRef(true);

	const fetchItems = useCallback(async () => {
		setLoading(true);
		setError(null);
		setItems(null);

		try {
			const response = await axiosPrivate.get(`/products/${category}`, {
				signal: new AbortController().signal,
			});
			if (isMounted.current) setItems(response.data);
		} catch (err) {
			if (err.name !== 'AbortError' && isMounted.current) {
				setError('Failed to fetch items. Please try again later.');
			}
		} finally {
			if (isMounted.current) setLoading(false);
		}
	}, [axiosPrivate, category]);

	useEffect(() => {
		isMounted.current = true;
		fetchItems();
		return () => {
			isMounted.current = false;
		};
	}, [fetchItems]);

	const card = useMemo(
		() => ({
			title: category,
			imageSrc: `images/category/${category}.jpeg`,
		}),
		[category],
	);

	if (loading) return <Spinner />;
	if (error)
		return (
			<h1 className='col-span-full text-3xl font-medium text-red-500'>{error}</h1>
		);
	if (!items || items.length === 0)
		return (
			<h1 className='col-span-full text-3xl font-medium'>No Products Found</h1>
		);

	return (
		<>
			<Helmet>
				<title>
					{category.replace('_', ' ').replace(/\b\w/g, (char) => char.toUpperCase())} -
					Manage Inventory | {APP_NAME}
				</title>
			</Helmet>
			<h1 className='uppercase'>{category}</h1>
			<div className='col-span-full'>
				<Card card={card} />
				<Table products={items} />
			</div>
		</>
	);
};

export default Category;
