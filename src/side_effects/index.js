import { select, take } from 'redux-saga/effects';

export default function*() {
	while (true) {
		yield take('*');
		const state = yield select();
		console.log(state);
	}
}
