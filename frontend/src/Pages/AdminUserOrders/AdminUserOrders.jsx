import React, { useEffect } from 'react';
import './AdminUserOrders.scss';
import APIService from '../../utils/ApiService';
import { useNavigate, useParams } from 'react-router-dom';
import { uid } from 'uid';
import AdminNavbar from '../../Components/AdminNavbar/AdminNavbar';
import { DatePicker } from '@mantine/dates';
import { Pagination } from '@mantine/core';
const AdminUserOrders = () => {
	const [orders, setOrders] = React.useState([]);
	const [q, setQ] = React.useState('');
	const [sort, setSort] = React.useState('Newest');
	const [dateRange, setDateRange] = React.useState([null, null]);
	const [actualDateRange, setActualDateRange] = React.useState([null, null]);
	const [page, setPage] = React.useState(1);
	const [totalPages, setTotalPages] = React.useState(1);
	const [showDatePicker, setShowDatePicker] = React.useState(false);
	const [user, setUser] = React.useState({});
	const { userId } = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		if (localStorage.getItem('token') === null) navigate('/login');
	}, []);
	useEffect(() => {
		(async () => {
			const resp = await APIService.GET(`/admin/${userId}/orders`);
			setOrders(resp.data.orders);
			setTotalPages(resp.data.totalPages);
			setUser(resp.data.user);
			setActualDateRange([
				new Date(resp.data.minDate),
				new Date(resp.data.maxDate),
			]);
		})();
	}, []);
	useEffect(() => {
		(async () => {
			const resp = await APIService.GET(
				`/admin/${userId}/orders?q=${q}&sort=${sort}&startingDate=${
					dateRange[0] ? new Date(dateRange[0]).getTime() : ''
				}&endingDate=${
					dateRange[1] ? new Date(dateRange[1]).getTime() : ''
				}&page=${page}&limit=10`,
			);
			setTotalPages(resp.data.totalPages);
			setOrders(resp.data.orders);
		})();
	}, [q, sort, dateRange, page]);
	return (
		<div className=''>
			<AdminNavbar />
			<div className='flex flex-col items-center justify-center'>
				<h1 className='text-3xl font-semibold'>{user.name}'s Orders</h1>
				<div className='mb-10 flex max-md:flex-col'>
					<input
						value={q}
						onChange={(e) => setQ(e.target.value)}
						type='text'
						placeholder='Search for Orders'
						className='border rounded-md border-gray-200 p-2 w-96'
					/>
					<select
						name='Sort'
						id=''
						className='border rounded-md h-full border-gray-200 p-2 ml-4'
						value={sort}
						onChange={(e) => {
							setSort(e.target.value);
						}}
					>
						<option value='Newest'>Newest</option>
						<option value='Oldest'>Oldest</option>
						<option value='LowToHigh'>Price: Low to High</option>
						<option value='HighToLow'>Price: High to Low</option>
					</select>
					<div className='date-range relative'>
						<button
							className='border rounded-md border-gray-200 p-2 ml-4'
							onClick={() => {
								setShowDatePicker(!showDatePicker);
							}}
						>
							{dateRange[0] && dateRange[1] ? (
								<span>
									{new Date(dateRange[0]).toLocaleDateString()} -{' '}
									{new Date(dateRange[1]).toLocaleDateString()}
								</span>
							) : (
								<span>Select Date Range</span>
							)}
						</button>

						{showDatePicker && (
							<div className='absolute '>
								{dateRange[0] && dateRange[1] ? (
									<button
										className='text-blue-500 underline text-center w-full'
										onClick={() => {
											setDateRange([null, null]);
											setShowDatePicker(false);
										}}
									>
										Clear Date Range
									</button>
								) : (
									<></>
								)}
								<DatePicker
									minDate={actualDateRange[0]}
									maxDate={actualDateRange[1]}
									bg='white'
									type='range'
									placeholder='Select Date Range'
									className='border rounded-md border-gray-200 p-2 ml-4'
									value={dateRange}
									onChange={(dates) => {
										setDateRange(dates);
										if (dates[0] && dates[1]) setShowDatePicker(false);
									}}
								/>
							</div>
						)}
					</div>
				</div>
				<div className='flex flex-col items-center  gap-4 justify-center w-full'>
					{orders.map((order) => {
						return (
							<div
								className='flex items-center rounded shadow-md p-4 justify-center gap-10 max-w-[70rem] w-full border border-gray-200'
								key={uid()}
							>
								<div className='icon' key={uid()}>
									<svg key={uid()} viewBox='0 0 512 512' className='w-16 h-16'>
										<g>
											<path
												d='m458.737 422.218-22.865-288.116c-1.425-18.562-17.123-33.103-35.739-33.103H354.97v-2.03C354.97 44.397 310.573 0 256.001 0s-98.969 44.397-98.969 98.969v2.03H111.87c-18.617 0-34.316 14.54-35.736 33.064L53.262 422.257c-1.77 23.075 6.235 46.048 21.961 63.026C90.949 502.261 113.242 512 136.385 512h239.231c23.142 0 45.436-9.738 61.163-26.717 15.726-16.979 23.73-39.951 21.958-63.065zM187.022 98.969c0-38.035 30.945-68.979 68.979-68.979s68.979 30.945 68.979 68.979v2.03H187.022v-2.03zm227.754 365.936c-10.218 11.03-24.124 17.105-39.16 17.105h-239.23c-15.036 0-28.942-6.075-39.16-17.105-10.217-11.031-15.211-25.363-14.063-40.315l22.87-288.195c.232-3.032 2.796-5.406 5.837-5.406h45.162v36.935c0 8.281 6.714 14.995 14.995 14.995 8.281 0 14.995-6.714 14.995-14.995v-36.935H324.98v36.935c0 8.281 6.714 14.995 14.995 14.995s14.995-6.714 14.995-14.995v-36.935h45.163c3.04 0 5.604 2.375 5.84 5.446l22.865 288.115c1.15 14.992-3.845 29.323-14.062 40.355z'
												fill='#000000'
												data-original='#000000'
												className
											/>
											<path
												d='M323.556 254.285c-5.854-5.856-15.349-5.856-21.204 0l-66.956 66.956-25.746-25.746c-5.855-5.856-15.35-5.856-21.206 0s-5.856 15.35 0 21.206l36.349 36.349c2.928 2.928 6.766 4.393 10.602 4.393s7.675-1.464 10.602-4.393l77.558-77.558c5.857-5.857 5.857-15.351.001-21.207z'
												fill='#000000'
												data-original='#000000'
												className
											/>
										</g>
									</svg>
								</div>
								<div className='flex-grow'>
									<h3 className='text-xl font-serif text-gray-800 font-bold'>
										{order.products
											.map(({ product }) => product.name)
											.join(' , ').length > 50
											? order.products
													.map(({ product }) => product.name)
													.join(' , ')
													.slice(0, 50) + '...'
											: order.products
													.map(({ product }) => product.name)
													.join(' , ')}
										<span className='bg-blue-500 text-white p-2 text-sm mx-4 rounded-2xl'>
											{order.status}
										</span>
									</h3>
									<p className='text-sm text-gray-500'>
										{order.products.length} items
									</p>
									<p className='text-md text-sm text-gray-500'>
										Total: ${order.total}
									</p>
									<p className='text-gray-500 text-sm'>
										Order Placed on{' '}
										{new Date(order.createdAt).toLocaleDateString()}
									</p>
									<p className='text-gray-500 text-sm'>
										Mode of Payment: {order.paymentMode}
									</p>
									<p className='text-gray-500 text-sm'>
										{order.address.address}
										<br />
										{order.address.city}, {order.address.state} -{' '}
										{order.address.pincode}
									</p>
								</div>
							</div>
						);
					})}
				</div>
				<div className='m-5'>
					<Pagination
						total={totalPages}
						value={page}
						onChange={(page) => {
							setPage(page);
						}}
						position='center'
						styles={(theme) => ({
							control: {
								'&[data-active]': {
									backgroundImage: theme.fn.gradient({
										from: 'red',
										to: 'yellow',
									}),
									border: 0,
								},
							},
						})}
					/>
				</div>
			</div>
		</div>
	);
};

export default AdminUserOrders;
