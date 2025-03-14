import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import PropTypes from 'prop-types';

const spinnerVariants = cva('flex-col items-center justify-center', {
	variants: {
		show: {
			true: 'flex',
			false: 'hidden',
		},
	},
	defaultVariants: {
		show: true,
	},
});

const loaderVariants = cva('animate-spin text-primary', {
	variants: {
		size: {
			small: 'size-6',
			medium: 'size-8',
			large: 'size-12',
		},
	},
	defaultVariants: {
		size: 'medium',
	},
});

export default function Spinner({ size, show, children, className }) {
	return (
		<div className='flex w-full h-full items-center justify-center lg:col-span-full'>
			<span className={spinnerVariants({ show })}>
				<Loader2 className={cn(loaderVariants({ size }), className)} />
				{children}
			</span>
		</div>
	);
}

Spinner.propTypes = {
	size: PropTypes.string,
	show: PropTypes.bool,
	children: PropTypes.node,
	className: PropTypes.string,
};
