import PropTypes from 'prop-types';

const Card = ({ card }) => (
	<div
		className={`w-full col-span-full${
			card.span ? ` lg:col-span-${card.span}` : ''
		} mx-auto`}>
		<img
			className='h-52 w-full object-cover shadow-sm shadow-slate-500/80 rounded mb-4 bg-white'
			src={`/${card.imageSrc}`}
			alt={card.title}
		/>
		<div className='content'>
			<h1 className='title font-medium text-base capitalize'>
				{card.title.replace('_', ' ')}
			</h1>
			{/* <p className='desc text-sm line-clamp-2'>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum fugit unde
				optio aut! Libero aut adipisci ea quidem et. Iure, voluptatum unde dolores
				cupiditate qui nostrum non illum ea asperiores?
			</p> */}
		</div>
	</div>
);

Card.propTypes = {
	card: PropTypes.shape({
		span: PropTypes.number,
		title: PropTypes.string,
		imageSrc: PropTypes.string,
	}),
};

export default Card;
