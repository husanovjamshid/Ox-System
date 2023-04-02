import { useDispatch, useSelector } from 'react-redux';

import { Private } from './pages/Private/Private';
import { Public } from './pages/Public/Public';
import { setToken } from './redux/Token/tokenAction';
import './app.scss';
import 'bootstrap/dist/css/bootstrap.min.css'

export const App = () => {
	let dispatch = useDispatch();
	dispatch(setToken(localStorage.getItem('token') || ''));
	const token = useSelector((item) => item.token.token);
	return <div className='App'>{token ? <Private /> : <Public />}</div>;
};
