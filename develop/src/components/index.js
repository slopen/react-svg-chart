import React from 'react';
import {render} from 'react-dom';

import 'styles/styles.less';
import App from 'components/app';

import {setLogLevel} from 'webpack/hot/log';


const el = document.getElementById ('root');

if (el) {
	render (<App/>, el);

	if (module.hot) {
		module.hot.accept ();
		setLogLevel ('warn');
	}

} else {
	console.error ('no root node found');
}