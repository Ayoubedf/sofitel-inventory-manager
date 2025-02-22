import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import clsx from 'clsx';
import { InfoIcon } from 'lucide-react';
import PropTypes from 'prop-types';
import { useMemo } from 'react';

const ProductsTable = ({ products }) => {
	const hasScreenDetails = useMemo(
		() => products.some((p) => p.screen),
		[products],
	);

	if (!products?.length) {
		return <h2 className='text-2xl font-medium'>No Products Found</h2>;
	}

	return (
		<Table className='bg-white shadow-md rounded-lg overflow-hidden mt-4 mb-8'>
			<TableHeader className='bg-gray-50'>
				<TableRow>
					{[
						{ label: 'Brand', className: 'w-[100px]' },
						{ label: 'Type' },
						{ label: 'Serial Number' },
						{ label: 'Department', className: hasScreenDetails ? '' : 'text-end' },
						hasScreenDetails && { label: 'Screen Details', className: 'text-center' },
					]
						.filter(Boolean)
						.map(({ label, className }) => (
							<TableHead key={label} className={className}>
								{label}
							</TableHead>
						))}
				</TableRow>
			</TableHeader>

			<TableBody>
				{products.map((product) => (
					<ProductRow
						key={product._id}
						product={product}
						hasScreenDetails={hasScreenDetails}
					/>
				))}
			</TableBody>
		</Table>
	);
};

const ProductRow = ({ product, hasScreenDetails }) => {
	const { brand, type, serial, department, screen } = product;

	return (
		<TableRow>
			<TableCell className='font-medium'>{brand}</TableCell>
			<TableCell>{type}</TableCell>
			<TableCell>{serial}</TableCell>
			<TableCell className={clsx({ 'text-end': !hasScreenDetails })}>
				{department}
			</TableCell>
			{hasScreenDetails && (
				<TableCell className='text-center'>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<button
									className='inline-flex items-center justify-center p-1 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 cursor-pointer'
									aria-label='View screen details'>
									<InfoIcon className='h-4 w-4' />
									<span className='sr-only'>View screen details</span>
								</button>
							</TooltipTrigger>
							<TooltipContent sideOffset={8}>
								<ScreenDetails screen={screen} />
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</TableCell>
			)}
		</TableRow>
	);
};

const ScreenDetails = ({ screen }) => (
	<div className='space-y-2'>
		<p className='font-semibold text-center'>Screen Details</p>
		<p>
			<span className='text-gray-600'>Brand:</span> {screen.brand}
		</p>
		<p>
			<span className='text-gray-600'>Type:</span> {screen.type}
		</p>
		<p>
			<span className='text-gray-600'>Serial:</span> {screen.serial}
		</p>
		<p>
			<span className='text-gray-600'>Department:</span> {screen.department}
		</p>
	</div>
);

ProductsTable.propTypes = {
	products: PropTypes.arrayOf(PropTypes.object),
};
ScreenDetails.propTypes = {
	screen: PropTypes.shape({
		brand: PropTypes.string,
		type: PropTypes.string,
		serial: PropTypes.string,
		department: PropTypes.string,
		imageUrl: PropTypes.string,
	}),
};
ProductRow.propTypes = {
	product: PropTypes.shape({
		_id: PropTypes.string,
		brand: PropTypes.string,
		type: PropTypes.string,
		serial: PropTypes.string,
		department: PropTypes.string,
		screen: PropTypes.object,
	}),
	hasScreenDetails: PropTypes.bool,
};

export default ProductsTable;
