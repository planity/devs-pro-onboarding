import React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader/root';
import App from './components/app';
import { fork } from 'redux-saga/effects';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from 'modules';
import sideEffects from 'side_effects';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
	reducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware(sagaMiddleware)
);
if (!window.store) {
	window.store = store;
}
let currentSideEffects = sagaMiddleware.run(function*() {
	yield fork(sideEffects);
});

if (module.hot) {
	module.hot.accept('./modules', () => {
		const nextRootReducer = require('./modules');
		store.replaceReducer(nextRootReducer.default);
	});
	module.hot.accept('./side_effects', () => {
		const nextSideEffects = require('./side_effects');
		currentSideEffects.cancel();
		currentSideEffects.done.then(() => {
			currentSideEffects = sagaMiddleware.run(function*() {
				yield fork(nextSideEffects.default);
			});
		});
	});
	module.hot.accept('./components/app.js', () => {});
}

const AppWithHotReloading = hot(App);

render(
	<AppWithHotReloading store={store} />,
	document.getElementById('planity')
);
