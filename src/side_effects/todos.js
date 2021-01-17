import { fork } from 'redux-saga/effects';
import { monitorNode } from './helpers';
import { todosHaveLoaded } from 'modules/todos';

export default function* todosSideEffects() {
	yield fork(monitorNode, `todos/${process.env.PLANITY_UID}`, todosHaveLoaded);
}
