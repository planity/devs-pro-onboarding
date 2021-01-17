import { delay, takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';
import {
	USER_TOGGLED_TODO,
	todosLinkShouldBeHighlighted,
	todosLinkShouldNotBeHighlighted
} from 'modules/todos';

export default function* todosHighlightingSideEffects() {
	yield takeLatest(USER_TOGGLED_TODO, highlightTodosMenu);
}

function* highlightTodosMenu() {
	yield put(todosLinkShouldBeHighlighted());
	yield delay(3000);
	yield put(todosLinkShouldNotBeHighlighted());
}
