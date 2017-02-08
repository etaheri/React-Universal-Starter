import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// SELECTORS
import { selectDataLoaded, selectData } from './selectors';

// SAGAS
import { loadAppPage } from './sagas';

// ACTIONS
import { viewActions } from './actions';

// INTERNAL
import UI from '../ui/ui';

// styles
import styles from './app.css';

class App extends Component {
	static propTypes = {
		location: PropTypes.object.isRequired,
		params: PropTypes.object.isRequired,
    data: PropTypes.object,

	};

	componentWillMount() {
		const { actions, dataLoaded } = this.props;
		if(!dataLoaded) {
			actions.loadAppPage();
		}
	}

	render() {
		const { dataLoaded, data, children } = this.props;
		if (!dataLoaded) {
			return null;
		}
		return (
			<div className={styles.app}>
				<h1>{data.get('name')} - App Container</h1>
				<UI />
				<div className={styles['app-content']}>
							{ children }
				</div>
			</div>
		);
	}
}

function preload({ dataLoaded }) {
	return [
		[loadAppPage]
	];
}

App.preload = preload;

function mapStateToProps(state) {
  return {
		dataLoaded: selectDataLoaded(state),
		data: selectData(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(viewActions, dispatch)
  };
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(App);
