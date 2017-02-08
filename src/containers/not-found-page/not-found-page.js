import React, { Component } from 'react';

// INTERNALS
import Meta from '../../components/meta/meta';

class NotFoundPage extends Component {

	render() {

		return (
				<div id="not-found">
					<div>
						<Meta
							title='404'
							description={`It looks like something went wrong.`}
							pathname={ '/not-found' }
							root={ true }
						/>
						<h3>Oops! It looks like something went wrong.</h3>
						<p>Link Here</p>
					</div>
				</div>
		)
	}
}

export default NotFoundPage;
