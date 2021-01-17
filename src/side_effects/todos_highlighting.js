import { delay, takeLatest } from 'redux-saga';
import { fork, put, select, take } from 'redux-saga/effects';
import {
	getTodos,
	USER_TOGGLED_TODO,
	TODOS_HAVE_LOADED,
	todosLinkShouldBeHighlighted,
	todosLinkShouldNotBeHighlighted
} from 'modules/todos';

export default function* todosHighlightingSideEffects() {
	yield takeLatest(
		[USER_TOGGLED_TODO, 'TODO_WAS_REMOTELY_COMPLETED'],
		highlightTodosMenu
	);
	yield fork(detectDistantCompletions);
}

function* highlightTodosMenu() {
	yield put(todosLinkShouldBeHighlighted());
	yield delay(3000);
	yield put(todosLinkShouldNotBeHighlighted());
}

function* detectDistantCompletions() {
	let previousTodos = yield select(getTodos);
	while (true) {
		yield take(TODOS_HAVE_LOADED);
		const todos = yield select(getTodos);
		if (someTodoWasRemotelyCompleted(todos, previousTodos)) {
			yield put({ type: 'TODO_WAS_REMOTELY_COMPLETED' });
		}
		previousTodos = todos;
	}
}

function someTodoWasRemotelyCompleted(todos, previousTodos) {
	const keys = todos
		.keySeq()
		.toSet()
		.intersect(previousTodos.keySeq());
	return keys.some(
		id =>
			todos.getIn([id, 'completed']) !== previousTodos.getIn([id, 'completed'])
	);
}
