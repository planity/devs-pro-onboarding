import React from 'react';
import { Global } from '@emotion/react';
import { Link } from 'react-router';

export default function Layout({ children }) {
	return (
		<div>
			<Global styles={styles.global} />
			<nav css={styles.nav}>
				<Link to={'/'}>Home</Link>
				<Link to={'/todos'}>Todos</Link>
			</nav>
			{children}
		</div>
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
	nav: {
		'backgroundColor': 'black',
		'& > a': {
			'display': 'inline-block',
			'padding': '1em 1.5em',
			'color': 'white',
			'textDecoration': 'none',
			'&:hover': {
				textDecoration: 'underline'
			}
		}
	}
};
