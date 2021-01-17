import { fork } from 'redux-saga/effects';
import todosHighlighting from './todos_highlighting';

export default function*() {
	yield fork(todosHighlighting);
}
