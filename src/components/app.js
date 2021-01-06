import React from 'react';
import { Provider } from 'react-redux';

export default function App({ store }) {
	return (
		<Provider store={store}>
			<h1>Welcome to Planity !</h1>
		</Provider>
	);
}
