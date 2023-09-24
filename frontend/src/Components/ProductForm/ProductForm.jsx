import React, { useEffect } from 'react';
import './ProductForm.scss';
import { useNavigate, useParams } from 'react-router-dom';
import APIService from '../../utils/ApiService';
import { toast } from 'react-toastify';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
const ProductForm = () => {
	const [product, setProduct] = React.useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{
			name: '',
			price: '',
			discounted_price: '',
			description: '',
			category: '',
			images: [],
		},
	);
	const { productId } = useParams();
	const navigate = useNavigate();
	const onImageSelect = async (e, index) => {
		const file = e.target.files[0];
		console.log(file);
		if (!file) return;
		if (!file.type.startsWith('image/'))
			return toast.error('Please select an image');
		if (file.size > 1024 * 1024 * 10)
			return toast.error('Image size must be less than 10MB');

		const form = new FormData();

		form.append('image', file);
		const { data } = await APIService.POST('/admin/upload', form, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
		const imageUrl = data.url;

		setProduct({
			images: product.images.map((image, i) => {
				if (i === index) {
					return {
						...image,
						url: imageUrl,
					};
				}
				return image;
			}),
		});
	};

	useEffect(() => {
		if (!productId) return;
		(async () => {
			const res = await APIService.GET(`/products/${productId}`);
			setProduct(res.data.product);
		})();
	}, []);

	const handleSubmit = async (e) => {
		if (
			!product.name ||
			!product.price ||
			!product.description ||
			!product.category
		)
			return toast.error('Please fill all the fields');
		if (isNaN(product.price) || isNaN(product.discounted_price))
			return toast.error('Price and discounted price must be a number');
		if (product.price < 0 || product.discounted_price < 0)
			return toast.error('Price and discounted price cannot be negative');
		if (product.price < product.discounted_price)
			return toast.error(
				'Discounted price cannot be greater than actual price',
			);
		if (product.images.length === 0)
			return toast.error('Please add atleast one image');
		if (product.images.some((image) => !image.url || !image.alt))
			return toast.error('Please fill all the image fields');
		if (product.description.length < 20)
			return toast.error('Description must be atleast 20 characters long');
		if (product.name.length < 5)
			return toast.error('Name must be atleast 5 characters long');

		if (!productId) {
			const res = await APIService.POST('/admin/products', product);
			toast.success('Product added successfully');
			navigate('/admin/products');
			return;
		}

		const res = await APIService.PUT(`/admin/products/${productId}`, product);
		toast.success('Product updated successfully');
		navigate('/admin/products');
	};
	const addImage = () => {
		setProduct({ images: [...product.images, { url: '', alt: '' }] });
	};
	const removeImage = (index) => {
		setProduct({ images: product.images.filter((_, i) => i !== index) });
	};
	const removeImageURL = (index) => {
		setProduct({
			images: product.images.map((image, i) => {
				if (i === index) {
					return {
						...image,
						url: '',
					};
				}
				return image;
			}),
		});
    };
    const onImageAltChange = (e, index) => { 
        setProduct({
            images: product.images.map((image, i) => {
                if (i === index) {
                    return {
                        ...image,
                        alt: e.target.value,
                    };
                }
                return image;
            }
            )
        })

    }
	return (
		<div className=''>
			<AdminNavbar />
			<div className='flex justify-center items-center'>
				<h1 className='text-3xl font-semibold'>
					{productId ? 'Edit Product' : 'Add Product'}
				</h1>
			</div>
			<div className='w-full flex justify-center mt-4'>
				<form className='w-full max-w-2xl'>
					<div className='flex flex-wrap -mx-3 mb-6'>
						<div className='w-full px-3 mb-6 md:mb-0 mt-4'>
							<label
								className='block uppercase text-gray-700 text-xs font-bold mb-2'
								htmlFor='grid-product-name'
							>
								Product Name
							</label>
							<input
								className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
								id='grid-product-name'
								type='text'
								placeholder='Product Name'
								value={product.name}
								onChange={(e) => setProduct({ name: e.target.value })}
							/>
						</div>
						<div className='w-full  px-3 mt-4'>
							<label
								className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
								htmlFor='grid-product-price'
							>
								Product Price
							</label>
							<input
								className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight mb-3 focus:outline-none focus:bg-white focus:border-gray-500'
								id='grid-product-price'
								type='text'
								placeholder='000'
								value={product.price}
								onChange={(e) => setProduct({ price: Number(e.target.value) })}
							/>
						</div>
						<div className='w-full  px-3 mt-4'>
							<label
								className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
								htmlFor='grid-product-discounted-price'
							>
								Product Discounted Price
							</label>
							<input
								className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
								id='grid-product-discounted-price'
								type='text'
								placeholder='000'
								value={product.discounted_price}
								onChange={(e) =>
									setProduct({ discounted_price: Number(e.target.value) })
								}
							/>
						</div>
						<div className='w-full  px-3 mt-4'>
							<label
								className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
								htmlFor='grid-product-category'
							>
								Category
							</label>
							<input
								className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
								id='grid-product-category'
								type='text'
								placeholder='Category'
								value={product.category}
								onChange={(e) => setProduct({ category: e.target.value })}
							/>
						</div>
					</div>
					<div className='flex flex-wrap -mx-3 mb-6'>
						<div className='w-full px-3'>
							<label
								className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
								htmlFor='grid-product-description'
							>
								Product Description
							</label>
							<textarea
								className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
								id='grid-product-description'
								placeholder='Product Description'
								value={product.description}
								onChange={(e) => setProduct({ description: e.target.value })}
							/>
							<p className='text-gray-600 text-xs italic mb-5'>
								Make it as long and as crazy as you'd like
							</p>
						</div>
						<div className='w-full px-3'>
							<button
								className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
								type='button'
								onClick={addImage}
							>
								Add Image
							</button>
							{product.images.map((image, index) => (
								<div
									key={index}
									className='flex justify-between border p-4 m-4 items-center w-full gap-4 flex-col'
								>
									<img src={image.url} alt={image.alt} className='w-1/2' />
									<div className='w-full flex flex-col items-center gap-4 '>
										{!image.url ? (
											<>
												<label
													className='block uppercase w-full tracking-wide text-gray-700 text-xs font-bold mb-2'
													htmlFor='grid-image-url'
												>
													Upload Image
												</label>
												<input
													className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
													id='grid-image-url'
													type='file'
													placeholder='Image URL'
													onChange={(e) => onImageSelect(e, index)}
												/>
											</>
										) : (
											<button
												className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
												type='button'
												onClick={() => removeImageURL(index)}
											>
												Change Photo
											</button>
										)}
									</div>
									<div className='w-full '>
										<label
											className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
											htmlFor='grid-image-name'
										>
											Image Alt
										</label>
										<input
											className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
											id='grid-image-name'
											type='text'
											placeholder='Image Alt'
											value={image.alt}
											onChange={(e) =>
												onImageAltChange(e,index)
											}
										/>
									</div>
									<button
										className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
										type='button'
										onClick={() => removeImage(index)}
									>
										Remove
									</button>
								</div>
							))}
						</div>
					</div>
					<div className='flex flex-wrap w-full  mb-6'>
						<button
							className='bg-green-500 w-full hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
							type='button'
							onClick={handleSubmit}
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ProductForm;
