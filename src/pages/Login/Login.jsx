import React from 'react';
import {
	LockOutlined,
	UserOutlined,
	CloudServerOutlined,
} from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setToken } from '../../redux/Token/tokenAction';
import './login.scss';
export const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onFinish = (values) => {
		fetch('https://toko.ox-sys.com/security/auth_check', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Accept: 'application/json',
			},
			body: `_username=${values.username}&_password=${values.password}&_subdomain=${values.subdomain}`,
		})
			.then((res) => res.json())
			.then((data) => {
				localStorage.setItem('token', data.token);
				dispatch(setToken(data.token));
				navigate('/');
			})
			.catch((err) => console.log(err));
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<div className='bg-dark h-100 position-absolute top-0 end-0 start-0 bottom-0	'>
			<h2 className='text-white text-center pt-4 mt-5 mb-0'>Admn Panel</h2>
			<Form
				name='normal_login'
				className='login-form shadow-lg p-4 rounded-3 mt-4 bg-white'
				initialValues={{ remember: true }}
				onFinish={onFinish}
			>
				<Form.Item
					name='username'
					rules={[{ required: true, message: 'Please input your Username!' }]}
				>
					<Input
						prefix={<UserOutlined className='site-form-item-icon' />}
						placeholder='Username'
					/>
				</Form.Item>
				<Form.Item
					name='password'
					rules={[{ required: true, message: 'Please input your Password!' }]}
				>
					<Input
						prefix={<LockOutlined className='site-form-item-icon' />}
						type='password'
						placeholder='Password'
					/>
				</Form.Item>
				<Form.Item>
					<Form.Item
						name='subdomain'
						rules={[{ required: true, message: 'Please input your Subdomain!' }]}
					>
						<Input
							prefix={<CloudServerOutlined className='site-form-item-icon' />}
							placeholder='Subdomain'
						/>
					</Form.Item>
					<Form.Item name='remember' valuePropName='checked' noStyle>
						<Checkbox>Remember me</Checkbox>
					</Form.Item>

					<Link className='login-form-forgot' to='/'>
						Forgot password
					</Link>
				</Form.Item>

				<Form.Item>
					<Button type='primary' htmlType='submit' className='login-form-button'>
						Log in
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};
