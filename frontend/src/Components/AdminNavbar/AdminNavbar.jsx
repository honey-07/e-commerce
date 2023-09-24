import React, { useEffect } from 'react';
import './AdminNavbar.scss';
import { Link, useNavigate } from 'react-router-dom';
import { clearUser } from '../../Slices/User';
import { useDispatch, useSelector } from 'react-redux';
import APIService from '../../utils/ApiService';
const AdminNavbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);
	useEffect(() => {
		if (!localStorage.getItem('token')) return navigate('/login');
		(async () => {
			try {
				const {
					data: { user },
				} = await APIService.GET('/auth/me');
				if (user.role !== 'admin') return navigate('/login');
			} catch (err) {
				console.log('E');
				// navigate('/login');
			}
		})();
	}, [user.name]);
	return (
		<div className='flex justify-between px-5 py-4 bg-white w-full items-center '>
			<Link to={'/admin'} className='text-2xl flex gap-4 items-center'>
				<svg viewBox='0 0 512 512' className='w-10 h-10'>
					<g>
						<path
							d='M143.5 326.255a7.5 7.5 0 0 0-7.5 7.5v13.5a7.5 7.5 0 0 0 15 0v-13.5a7.5 7.5 0 0 0-7.5-7.5z'
							className
							opacity={1}
						></path>
						<path
							d='M488.312 425.849h-12.143V217.76c20.115-3.56 35.445-21.155 35.445-42.276v-28.876c0-.147-.014-.291-.022-.436-.005-.081-.005-.162-.012-.243a7.517 7.517 0 0 0-.128-.871c-.003-.017-.009-.033-.013-.049a7.389 7.389 0 0 0-.224-.8c-.022-.066-.048-.132-.072-.197a7.436 7.436 0 0 0-.278-.655c-.019-.039-.031-.08-.05-.118L477.653 77.29V42.796c0-8.902-7.243-16.145-16.145-16.145H120.456a7.5 7.5 0 0 0 0 15h341.052c.631 0 1.145.514 1.145 1.145V71.64H49.347V42.796c0-.631.514-1.145 1.145-1.145H85.56a7.5 7.5 0 0 0 0-15H50.492c-8.902 0-16.145 7.243-16.145 16.145V77.29L1.186 143.239c-.019.039-.032.08-.05.118a7.436 7.436 0 0 0-.278.655c-.024.066-.05.131-.072.197a7.389 7.389 0 0 0-.224.8l-.013.049c-.06.285-.102.575-.128.871-.007.081-.007.162-.012.243-.008.145-.022.289-.022.436v28.876c0 21.12 15.33 38.716 35.445 42.276v208.089H23.688C10.626 425.849 0 436.476 0 449.538v23.722c0 6.666 5.423 12.089 12.089 12.089h487.822c6.666 0 12.089-5.423 12.089-12.089v-23.722c0-13.062-10.626-23.689-23.688-23.689zm8.301-250.364c0 15.409-12.536 27.945-27.945 27.945s-27.945-12.536-27.945-27.945v-21.376h55.89v21.376zM465.565 86.64l26.382 52.468h-53.448L419.655 86.64h45.91zm-61.849 0 18.844 52.468h-54.17L357.083 86.64h46.633zm22.008 67.468v21.376c0 15.409-12.536 27.945-27.945 27.945s-27.945-12.536-27.945-27.945v-21.376h55.89zM341.739 86.64l11.307 52.468h-54.62l-3.769-52.468h47.082zm13.095 67.468v21.376c0 15.409-12.536 27.945-27.944 27.945s-27.945-12.536-27.945-27.945v-21.376h55.889zM232.382 86.64h47.235l3.769 52.468h-54.773l3.769-52.468zm-4.327 67.468h55.89v21.376c0 15.409-12.536 27.945-27.945 27.945s-27.945-12.536-27.945-27.945v-21.376zM256 218.429c14.704 0 27.701-7.431 35.445-18.732 7.744 11.301 20.741 18.732 35.445 18.732s27.701-7.431 35.444-18.732c7.744 11.301 20.741 18.732 35.445 18.732s27.701-7.431 35.445-18.732c6.396 9.334 16.379 16.016 27.945 18.063v208.089H178.836V259.185c0-7.692-6.258-13.95-13.95-13.95H78.177c-7.692 0-13.95 6.258-13.95 13.95v166.664H50.832V217.76c11.566-2.047 21.549-8.729 27.945-18.063 7.744 11.301 20.741 18.732 35.445 18.732s27.701-7.431 35.445-18.732c7.744 11.301 20.741 18.732 35.444 18.732s27.701-7.431 35.445-18.732c7.743 11.301 20.74 18.732 35.444 18.732zm-92.164 41.806v165.614H79.227V260.235h84.609zm-77.56-84.75v-21.376h55.89v21.376c0 15.409-12.536 27.945-27.945 27.945s-27.945-12.537-27.945-27.945zm83.985-88.845h47.082l-3.769 52.468h-54.62l11.307-52.468zm-13.095 67.468h55.889v21.376c0 15.409-12.536 27.945-27.945 27.945s-27.944-12.536-27.944-27.945v-21.376zm-2.25-67.468-11.307 52.468h-54.17l18.844-52.468h46.633zm-108.481 0h45.91l-18.844 52.468H20.053L46.435 86.64zm-31.048 88.845v-21.376h55.89v21.376c0 15.409-12.536 27.945-27.945 27.945s-27.945-12.537-27.945-27.945zM15 470.349v-20.812c0-4.791 3.897-8.688 8.688-8.688h464.623c4.791 0 8.688 3.897 8.688 8.688v20.812H15z'
							className
							opacity={1}
						></path>
						<path
							d='M426.773 245.235H335.06a7.5 7.5 0 0 0 0 15h90.664V378.27H209.5V260.235h90.25a7.5 7.5 0 0 0 0-15h-91.3c-7.692 0-13.95 6.257-13.95 13.95v120.136c0 7.692 6.258 13.95 13.95 13.95h218.323c7.692 0 13.95-6.258 13.95-13.95V259.185c0-7.692-6.258-13.95-13.95-13.95z'
							className
							opacity={1}
						></path>
					</g>
				</svg>
				<span>SmartShop</span>
			</Link>
			<div className='flex items-center gap-5'>
				<Link
					to='/admin/add-product'
					className='text-lg flex items-center gap-2 hover:text-blue-500 cursor-pointer'
				>
					Add Product
				</Link>
				<Link
					to='/admin/products'
					className='text-lg flex items-center gap-2 hover:text-blue-500 cursor-pointer'
				>
					All Products
				</Link>
				<p
					className='text-lg flex items-center gap-2 hover:text-blue-500 cursor-pointer'
					onClick={() => {
						localStorage.removeItem('token');
						dispatch(clearUser());
					}}
				>
					<svg viewBox='0 0 30 30' className='w-8 h-8'>
						<g>
							<g
								fill='none'
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
							>
								<path d='M15 5v10M10 8.5a9 9 0 1 0 10 0' fill />
							</g>
						</g>
					</svg>
					<span>Logout</span>
				</p>
			</div>
		</div>
	);
};

export default AdminNavbar;
