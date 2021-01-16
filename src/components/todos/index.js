import React from 'react';
import { connect } from 'react-redux';
import { getTodos, userToggledTodo } from 'modules/todos';

export default connect(
	state => ({
		todos: getTodos(state)
	}),
	{ userToggledTodo }
)(function Todos({ todos, userToggledTodo }) {
	return (
		<ul>
			{todos
				.map((todo, todoId) => (
					<li
						key={todoId}
						css={[styles.todo, todo.get('completed') && styles.completedTodo]}
						onClick={() => userToggledTodo(todoId)}
					>
						{todo.get('title')}
					</li>
				))
				.valueSeq()}
		</ul>
	);
});

const styles = {
	todo: {
		padding: '.75em 1em',
		cursor: 'pointer',
		userSelect: 'none'
	},
	completedTodo: {
		color: 'gray',
		textDecoration: 'line-through'
	}
};
