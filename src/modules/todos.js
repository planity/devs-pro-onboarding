import { fromJS, Map } from 'immutable';

const INITIAL_STATE = fromJS({
	status: 'loading',
	todos: {},
	linkIsHighlighted: false
});

export default function todosReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case TODOS_HAVE_LOADED:
			return state
				.set('status', 'loaded')
				.set('todos', fromJS(action.payload.todos || {}));
		case USER_TOGGLED_TODO:
			return state.updateIn(
				['todos', action.payload.todoId, 'completed'],
				completed => !completed
			);
		case TODOS_LINK_SHOULD_BE_HIGHLIGHTED:
			return state.set('linkIsHighlighted', true);
		case TODOS_LINK_SHOULD_NOT_BE_HIGHLIGHTED:
			return state.set('linkIsHighlighted', false);
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

export const TODOS_LINK_SHOULD_BE_HIGHLIGHTED =
	'TODOS_LINK_SHOULD_BE_HIGHLIGHTED';

export const todosLinkShouldBeHighlighted = () => ({
	type: TODOS_LINK_SHOULD_BE_HIGHLIGHTED
});

export const TODOS_LINK_SHOULD_NOT_BE_HIGHLIGHTED =
	'TODOS_LINK_SHOULD_NOT_BE_HIGHLIGHTED';

export const todosLinkShouldNotBeHighlighted = () => ({
	type: TODOS_LINK_SHOULD_NOT_BE_HIGHLIGHTED
});

export function getTodosLinkIsHighlighted(state) {
	return state.todos.get('linkIsHighlighted');
}

export function getTodosHaveLoaded(state) {
	return state.todos.get('status') === 'loaded';
}

export const TODOS_HAVE_LOADED = 'TODOS_HAVE_LOADED';

export const todosHaveLoaded = todos => ({
	type: TODOS_HAVE_LOADED,
	payload: { todos }
});
