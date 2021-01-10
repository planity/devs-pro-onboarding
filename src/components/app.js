import React from 'react';
import { Provider } from 'react-redux';
import { Global } from '@emotion/react';
import { colors, fontWeights } from 'config/styles';

export default function App({ store }) {
	return (
		<Provider store={store}>
			<div>
				<Global styles={styles.global} />
				<h1 css={styles.title}>Welcome to Planity !</h1>
			</div>
		</Provider>
	);
}

const styles = {
	global: {
		'*, *:before, *:after': {
			boxSizing: 'border-box'
		},
		'body': {
			fontFamily: 'Open Sans, sans-serif'
		}
	},
	title: {
		'margin': 10,
		'color': colors.green500,
		'fontWeight': fontWeights.bold,
		'@media (min-width: 500px)': {
			color: 'red'
		}
	}
};
