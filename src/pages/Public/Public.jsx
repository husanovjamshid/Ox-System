import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from '../Login/Login';

export const Public = () => {
	return (
		<div>
			<Routes>
				<Route path='/' element={<Login />} />
			</Routes>
		</div>
	);
};
