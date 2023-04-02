import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal } from 'antd';
import { Pagination } from '../../components/Pagination/Pagination';
import {
	FileOutlined,
	PieChartOutlined,
	ScheduleOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { Tables } from '../../components/Table/Table';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label,
	};
}
const item = [
	getItem('Dashboard', '1', <PieChartOutlined />),
	getItem('Products', '2', <ScheduleOutlined />),
	getItem('Files', '9', <FileOutlined />),
];

export const Home = () => {
	// Pagination
	let [page, setPage] = useState(1);
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const token = useSelector((item) => item.token.token);

	const [product, setProduct] = useState([]);

	// const getProducts = async () => {
	// 	const data = await
	// };

	let { items, total_count } = product;

	console.log(items);

	useEffect(() => {
		axios
			.get('https://toko.ox-sys.com/variations', {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				params: {
					size: 20,
					page: `${page}`,
				},
			})

			.then((data) => {
				if (data.status === 200) {
					console.log(data.data);
					setProduct(data.data);
				}
			})
			.catch((error) => console.error(error));
	}, [page]);

	// Input

	const inputValue = useRef();
	const [modalProduct, setModalProduct] = useState([]);
	const handleInput = () => {
		console.log(inputValue.current.value);
		const filteredProducts = items
			.filter((product) => {
				return product.name
					.toLowerCase()
					.includes(inputValue.current.value.toLowerCase());
			})
			.sort((a, b) => {
				const aName = a.name.toLowerCase();
				const bName = b.name.toLowerCase();
				if (aName < bName) {
					return -1;
				}
				if (aName > bName) {
					return 1;
				}
				return 0;
			});
		setModalProduct(filteredProducts);
		console.log(filteredProducts.map((item) => item.name));
	};

	const handlePress = () => {
		setIsModalOpen(true);
	};

	// Modal
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOk = () => {
		setIsModalOpen(false);
		inputValue.current.value = '';
	};
	const handleCancel = () => {
		setIsModalOpen(false);
		inputValue.current.value = '';
	};

	return (
		<div>
			<Layout
				style={{
					minHeight: '100vh',
				}}
			>
				<Sider
					collapsible
					collapsed={collapsed}
					onCollapse={(value) => setCollapsed(value)}
				>
					<div
						style={{
							height: 32,
							margin: 16,
							background: 'rgba(255, 255, 255, 0.2)',
						}}
					/>
					<Menu
						theme='dark'
						defaultSelectedKeys={['1']}
						mode='inline'
						items={item}
					/>
				</Sider>
				<Layout className='site-layout'>
					<Header
						style={{
							padding: 0,
							background: colorBgContainer,
						}}
					/>
					<Content
						style={{
							margin: '0 16px',
						}}
					>
						<Breadcrumb
							style={{
								margin: '16px 0',
							}}
						>
							<div style={{ width: '350px' }} className='input-group  ms-auto'>
								<input
									className='form-control'
									onKeyUp={handleInput}
									ref={inputValue}
									placeholder='Search Products'
									type='text'
									onClick={handlePress}
								/>
								<button className='btn btn-primary'>Search</button>
							</div>
						</Breadcrumb>
						<div
							style={{
								padding: 24,
								minHeight: 360,
								background: colorBgContainer,
							}}
						>
							<div className='card shadow mb-4'>
								<div className='card-header py-3'>
									<h6 className='m-0 font-weight-bold text-primary'>Products</h6>
								</div>
								<div className='card-body'>
									<div className='table-responsive'>
										<table
											className='table table-bordered'
											id='dataTable'
											width='100%'
											cellSpacing={0}
										>
											<thead>
												<tr>
													<th>ID</th>
													<th>Name</th>
													<th>Barcode</th>
													<th>Sku</th>
													<th>Description</th>
												</tr>
											</thead>

											<tbody>
												{items?.map((item) => (
													<tr>
														<td>{item.id}</td>
														<td>{item.name}</td>
														<td>{item.barcode}</td>
														<td>{item.sku}</td>
														<td>{item?.shortDescription}</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
								<Pagination setPage={setPage} page={total_count} />
							</div>
						</div>
					</Content>
					<Footer
						style={{
							textAlign: 'center',
						}}
					>
						Ant Design ©2023 Created by Ant UED
					</Footer>
				</Layout>
			</Layout>
			<>
				{/* <Button type='primary' onClick={showModal}>
					<span className='text-primary'>Open Modal</span>
				</Button> */}
				<Modal
					title='Basic Modal'
					open={isModalOpen}
					onOk={handleOk}
					onCancel={handleCancel}
				>
					<div className='input-group  ms-auto'>
						<input
							className='form-control'
							onChange={handleInput}
							ref={inputValue}
							placeholder='Search Products'
							type='text'
						/>

						<button className='btn btn-primary'>Search</button>
					</div>
					{modalProduct.length ? (
						<div className='card shadow mb-4 mt-3'>
							<div className='card-header py-3'>
								<h6 className='m-0 font-weight-bold text-primary'>Products</h6>
							</div>
							<div className='card-body'>
								<div className='table-responsive'>
									<table
										className='table table-bordered'
										id='dataTable'
										width='100%'
										cellSpacing={0}
									>
										<thead>
											<tr>
												<th>ID</th>
												<th>Name</th>
												<th>Barcode</th>
												<th>Sku</th>
												<th>Description</th>
											</tr>
										</thead>

										<tbody>
											{modalProduct?.map((item) => (
												<tr>
													<td>{item.id}</td>
													<td>{item.name}</td>
													<td>{item.barcode}</td>
													<td>{item.sku}</td>
													<td>{item?.shortDescription}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
							<Pagination setPage={setPage} page={total_count} />
						</div>
					) : (
						''
					)}
				</Modal>
			</>
		</div>
	);
};
