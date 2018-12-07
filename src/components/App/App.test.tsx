import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
	const div = document.createElement('div');
	// noinspection RequiredAttributes
	ReactDOM.render(<App/>, div);
	ReactDOM.unmountComponentAtNode(div);
});
