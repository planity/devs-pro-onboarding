import { buffers, eventChannel } from 'redux-saga';
import { cancelled, put, take } from 'redux-saga/effects';
import { watchNode, unwatchNode } from 'services/firebase';

export function* monitorNode(node, emitter) {
	const channel = eventChannel(emit => {
		const listener = watchNode(node, emit);
		return () => {
			unwatchNode(node, listener);
		};
	}, buffers.expanding(3));
	try {
		while (true) {
			const payload = yield take(channel);
			yield put(emitter(payload));
		}
	} catch (e) {
		console.warn(e);
	} finally {
		if (yield cancelled()) {
			channel.close();
		}
	}
}
