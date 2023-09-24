import React from 'react';
import './AdminAllProducts.scss';
import AdminNavbar from '../../Components/AdminNavbar/AdminNavbar';
import APIService from '../../utils/ApiService';
import { useSearchParams } from 'react-router-dom';
import AdminProductCard from '../../Components/AdminProductCard/AdminProductCard';
import { uid } from 'uid';
const AdminAllProducts = () => {
	const [products, setProducts] = React.useState([]);
	const [searchParams, setSearchParams] = useSearchParams();
	const [sorting, setSorting] = React.useState(
		searchParams.get('sort') || 'Newest First',
	);
	const [productsInfo, setProductsInfo] = React.useState({
		page: 1,
		limit: 12,
		total: 0,
		totalPages: 0,
	});
	const [categories, setCategories] = React.useState([]);
	const [currentCategory, setCurrentCategory] = React.useState('');
	const [q, setQ] = React.useState(searchParams.get('q') || '');
	const [currentPage, setCurrentPage] = React.useState(
		Number(searchParams.get('page')) || 1,
	);
	React.useEffect(() => {
		(async () => {
			const resp = await APIService.GET('/products');
			setProducts(resp.data.products);
			setProductsInfo({
				page: resp.data.page,
				total: resp.data.total,
				totalPages: resp.data.totalPages,
			});
		})();
	}, []);

	React.useEffect(() => {
		(async () => {
			const resp = await APIService.GET(
				`/products?limit=12&q=${q}&category=${
					currentCategory || ''
				}&page=${currentPage}&sort=${sorting}`,
			);
			setProducts(resp.data.products);
			setProductsInfo({
				page: resp.data.page,
				total: resp.data.total,
				totalPages: resp.data.totalPages,
			});
		})();
	}, [q, currentCategory, currentPage, sorting, location.pathname]);

	return (
		<div className=''>
			<AdminNavbar />
			<div className='flex justify-center items-center'>
				<h1 className='text-3xl font-semibold'>All Products</h1>
			</div>
			<div className='w-full flex justify-center mt-4'>
				<input
					placeholder='Search'
					className='w-full max-w-[70rem] p-2 text-lg  bg-transparent border border-black border-b-2 border-y-0 border-x-0 focus:outline-none'
					type='text'
					value={q}
					onChange={(e) => {
						setQ(e.target.value);
						setSearchParams({ q: e.target.value });
						setCurrentPage(1);
					}}
				/>
			</div>
			<div className='flex justify-center items-center w-full'>
				<div className='flex gap-5 mt-2 overflow-auto max-w-[70rem] p-4 w-full justify-center'>
					{[
						'Price: Low to High',
						'Price: High to Low',
						'Newest First',
						'Oldest First',
					].map((type, i) => (
						<div
							key={i}
							onClick={() => {
								setSorting(type);
							}}
							className={`flex whitespace-nowrap shadow-md justify-center items-center   rounded-full px-5 py-2 cursor-pointer hover:bg-black hover:text-white transition duration-300   ${
								sorting === type ? 'bg-black text-white' : 'bg-white text-black'
							}`}
						>
							{type}
						</div>
					))}
				</div>
			</div>
			<div className='flex justify-center mt-4 w-full mb-10'>
				<div
					className='grid  w-full gap-4  justify-items-stretch px-10 max-w-[70rem]'
					style={{
						gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))',
					}}
				>
					{products.map((product) => {
						return <AdminProductCard key={uid()} card={product} />;
					})}
				</div>
			</div>
		</div>
	);
};

export default AdminAllProducts;
