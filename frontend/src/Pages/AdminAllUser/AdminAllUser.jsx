import React, { useEffect } from 'react';
import './AdminAllUser.scss';
import APIService from '../../utils/ApiService';
import { Link } from 'react-router-dom';
import AdminNavbar from '../../Components/AdminNavbar/AdminNavbar';
const AdminAllUser = () => {
    const [ users, setUsers ] = React.useState([]);
    const [name, setName] = React.useState('');
    useEffect(() => {
        (async () => {
            const { data: users } = await APIService.GET('/admin/users' + (name ? `?email=${name}` : ''));
            setUsers(users.user);

        })()


    }, [name])


    return <div className=''>
        <AdminNavbar/>
        <h1 className='text-3xl m-5 text-center text-blue-500'>Admin All User</h1>
        <div className='flex justify-center items-center'>
            <input
                type='text'
                placeholder='Search by email'
                className='border border-slate-500 rounded-md p-2 w-1/2'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </div>

        <div className="p-4">
            <table className="table-fixed shadow-md border border-[rgba(0,0,0,.2)] text-center w-full border-slate-500">
                <thead>
                    <tr>
                        <th className='text-xl p-4 '>Name</th>
                        <th className='text-xl p-4 '>Email</th>
                        <th className='text-xl p-4 '>Total Products Purchased</th>
                        <th className='text-xl p-4 '>
                            Total Orders
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((user, index) => {
                            return <tr key={index} className='p-4 odd:bg-slate-200'>
                                <td className='p-3 text-lg'>{user.name}</td>
                                <td className='p-3 text-lg'>{user.email}</td>
                                <td className='p-3 text-lg'>{user.totalProducts}</td>
                                <td className='p-3 text-lg'>{user.totalOrders}</td>
                                <td className='p-3 text-lg'> <Link to={`/admin/${user._id}/orders`} className=' hover:opacity-50'>Checkout Orders</Link></td>
                            </tr>
                        }
                        )
                    }
                </tbody>
            </table>
        </div>
    </div>;
};

export default AdminAllUser;