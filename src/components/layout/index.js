import React from 'react';
import { connect } from 'react-redux';
import {
	getUncompletedTodosCount,
	getTodosLinkIsHighlighted
} from 'modules/todos';
import { Global } from '@emotion/react';
import { Link } from 'react-router';

export default connect(state => ({
	todosCount: getUncompletedTodosCount(state),
	highlightTodos: getTodosLinkIsHighlighted(state)
}))(function Layout({ children, todosCount, highlightTodos }) {
	return (
		<div>
			<Global styles={styles.global} />
			<nav css={styles.nav}>
				<Link to={'/'}>Home</Link>
				<Link to={'/todos'} style={highlightTodos ? styles.highlighted : {}}>
					Todos ({todosCount})
				</Link>
			</nav>
			{children}
		</div>
	);
});

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
	},
	highlighted: {
		color: 'red'
	}
};
