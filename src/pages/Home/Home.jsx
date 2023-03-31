import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
	FileOutlined,
	PieChartOutlined,
	UserOutlined,
	ScheduleOutlined,
	TeamOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label,
	};
}
const items = [
	getItem('Dashboard', '1', <PieChartOutlined />),
	getItem('Products', '2', <ScheduleOutlined  />),
	getItem('Files', '9', <FileOutlined />),
];

export const Home = () => {
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const token = useSelector((item) => item.token.token);

	const getProducts = async () => {
		const data = await axios
			.get('https://toko.ox-sys.com/variations', {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				params: {
					size: 20,
					page: 2,
				},
			})

			.then((data) => console.log(data))
			.catch((error) => console.error(error));
	};

	useEffect(() => {
		getProducts();
	}, []);

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
						items={items}
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
							<Breadcrumb.Item>User</Breadcrumb.Item>
							<Breadcrumb.Item>Bill</Breadcrumb.Item>
						</Breadcrumb>
						<div
							style={{
								padding: 24,
								minHeight: 360,
								background: colorBgContainer,
							}}
						>
							Bill is a cat.
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
		</div>
	);
};
