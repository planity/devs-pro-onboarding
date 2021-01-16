import { fromJS, Map } from 'immutable';

const INITIAL_STATE = fromJS({
	status: 'loaded',
	todos: {
		id1: {
			title: 'Todo 1',
			completed: true,
			sort: 1
		},
		id3: {
			title: 'Todo 3',
			completed: false,
			sort: 3
		},
		id2: {
			title: 'Todo 2',
			completed: false,
			sort: 2
		}
	}
});

export default function todosReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case USER_TOGGLED_TODO:
			return state.updateIn(
				['todos', action.payload.todoId, 'completed'],
				completed => !completed
			);
		default:
			return state;
	}
}

export function getTodos(state) {
	return (state.todos.get('todos') || new Map()).sortBy(todo =>
		todo.get('sort')
	);
}

export function getUncompletedTodosCount(state) {
	const todos = getTodos(state);
	return todos.filter(todo => !todo.get('completed')).size;
}

export const USER_TOGGLED_TODO = 'USER_TOGGLED_TODO';

export const userToggledTodo = todoId => ({
	type: USER_TOGGLED_TODO,
	payload: { todoId }
});
