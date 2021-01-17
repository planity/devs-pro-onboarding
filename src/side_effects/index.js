import { fork } from 'redux-saga/effects';
import todos from './todos';
import todosHighlighting from './todos_highlighting';

export default function*() {
	yield fork(todos);
	yield fork(todosHighlighting);
}
