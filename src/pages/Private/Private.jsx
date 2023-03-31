import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../Home/Home';

export const Private = () => {
	return (
		<div>
			<Routes>
				<Route path='/' element={<Home />} />
			</Routes>
		</div>
	);
};
