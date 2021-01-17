import firebase from 'firebase/app';
import 'firebase/database';

firebase.initializeApp({
	apiKey: 'AIzaSyC6B9HQYFE3KrWtFJwTLR-4IJRHBRoTFdM',
	authDomain: 'planity-playground-75252.firebaseapp.com',
	databaseURL:
		'https://planity-playground-75252-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'planity-playground-75252',
	storageBucket: 'planity-playground-75252.appspot.com',
	messagingSenderId: '752495775440',
	appId: '1:752495775440:web:232c5fcc6fb5560f5f58d5',
	measurementId: 'G-YGRBM0NLEL'
});

export async function fetchNode(node) {
	const snapshot = await firebase
		.database()
		.ref(node)
		.once('value');
	return snapshot.val();
}

export function watchNode(node, cb) {
	return firebase
		.database()
		.ref(node)
		.on('value', snapshot => cb(snapshot.val()));
}

export function unwatchNode(node, listener) {
	return firebase
		.database()
		.ref(node)
		.off('value', listener);
}
