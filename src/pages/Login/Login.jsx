import axios from 'axios';
import React, { useEffect, useRef } from 'react';

import { Button, Form, Input } from 'antd';

export const Login = () => {

	const company = 'toko';

	const onFinish = (values) => {
		// console.log('Form data:', values.username);
		fetch('https://toko.ox-sys.com/security/auth_check', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Accept: 'application/json',
			},
			body: `_username=${values.username}&_password=${values.password}&_subdomain=${company}`,
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data.token);
			})
			.catch((err) => console.log(err));
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<>
			<Form
				name='basic'
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 600, margin: '0 auto' }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete='off'
			>
				<Form.Item
					label='Username'
					name='username'
					rules={[{ required: true, message: 'Please input your username!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label='Password'
					name='password'
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type='primary' htmlType='submit' style={{ width: '100%' }}>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};
