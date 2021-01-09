import React from 'react';
import { Provider } from 'react-redux';
import { colors, fontWeights } from 'config/styles';

export default function App({ store }) {
	return (
		<Provider store={store}>
			<h1 css={styles.title}>Welcome to Planity !</h1>
		</Provider>
	);
}

const styles = {
	title: {
		'margin': 10,
		'color': colors.green500,
		'fontWeight': fontWeights.bold,
		'@media (min-width: 500px)': {
			color: 'red'
		}
	}
};
