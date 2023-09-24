import { Link, useNavigate } from 'react-router-dom';
import { addToCart } from '../../Slices/Cart';
import { useDispatch, useSelector } from 'react-redux';
import APIService from '../../utils/ApiService';
const AdminProductCard = ({ card }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const navigate = useNavigate();
	const cart = useSelector((state) => state.cart);
	const onEdit = (e) => {
		navigate(`/admin/edit/${card._id}`);
	};
	const onDelete = async (e) => {
		await APIService.DELETE(`/admin/products/${card._id}`);
		window.location.reload();
	};
	return (
		<div className='h-full'>
			<div className=' flex flex-col h-full container bg-white max-w-sm rounded-2xl p-9 overflow-hidden shadow-xl hover:shadow-2xl transition duration-300'>
				<img
					className='rounded-xl'
					src={card.images[0].url}
					alt={card.images[0].alt}
				/>
				<div className='py-1 mt-2 px-2 bg-orange-400 w-max text-xs rounded-2xl text-white'>
					{card.category}
				</div>
				<div className='flex items-center flex-col flex-grow'>
					<div className='w-full flex-grow'>
						<p
							
							className='block mt-2 text-xl w-full font-semibold'
						>
							{card.name}
						</p>
						<p className='text-sm text-gray-400'>
							{card.description.length > 100
								? card.description.slice(0, 100) + '...'
								: card.description}
						</p>
						<div className='flex gap-2'>
							<p
								className={`mt-1 text-left text-lg ${'line-through opacity-50'}`}
							>
								${card.price}
							</p>

							<p className='mt-1 text-left text-xl '>
								${card.discounted_price}
							</p>
						</div>
					</div>
					<div className='flex justify-between items-center w-full flex-row-reverse gap-8'>
						<div className='w-1/4 flex items-center gap-1'>
							{card.rating.toFixed(1)}{' '}
							<svg
								className={'text-yellow-300 w-5 h-5'}
								fill={'currentColor'}
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='1'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'></path>
							</svg>
						</div>
						<div className='flex gap-4'>
							<button
								onClick={onEdit}
								className=' flex-grow border-none cursor-pointer text-white text-md font-semibold bg-green-400 py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 '
							>
								Edit
							</button>
							<button
								onClick={onDelete}
								className=' flex-grow border-none cursor-pointer text-white text-md font-semibold bg-red-400 py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 '
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminProductCard;
