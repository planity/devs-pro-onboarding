import { takeEvery } from 'redux-saga';
import { call, fork, select } from 'redux-saga/effects';
import { monitorNode } from './helpers';
import { getTodos, todosHaveLoaded, USER_TOGGLED_TODO } from 'modules/todos';
import { setNode } from 'services/firebase';

export default function* todosSideEffects() {
	yield fork(monitorNode, `todos/${process.env.PLANITY_UID}`, todosHaveLoaded);
	yield takeEvery(USER_TOGGLED_TODO, toggleTodo);
}

function* toggleTodo({ payload }) {
	try {
		const { todoId } = payload;
		const todos = yield select(getTodos);
		const currentValue = todos.getIn([todoId, 'completed']);
		yield call(
			setNode,
			`todos/${process.env.PLANITY_UID}/${todoId}/completed`,
			!currentValue
		);
	} catch (e) {
		console.warn(e);
	}
}
