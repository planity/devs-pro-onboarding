import React from 'react';
import { Provider } from 'react-redux';
import { browserHistory, IndexRoute, Route, Router } from 'react-router';
import Layout from './layout';
import Landing from './landing';
import Todos from './todos';

export default function App({ store }) {
	return (
		<Provider store={store}>
			<Router history={browserHistory}>
				<Route path={'/'} component={Layout}>
					<IndexRoute component={Landing} />
					<Route path={'todos'} component={Todos} />
				</Route>
			</Router>
		</Provider>
	);
}
