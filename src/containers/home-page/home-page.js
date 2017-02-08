import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// ACTIONS
import {viewActions} from './actions';

// SAGAS
import {loadHome} from './sagas';

// SELECTORS
import {selectHomeLoaded, selectHomeData} from './selectors';
import {selectDataLoaded} from '../app/selectors';

// INTERNAL
// import Meta from '../../components/meta/meta';

// STYLES

class HomePage extends Component {

	static propTypes = {
		location: PropTypes.object.isRequired,
		home: PropTypes.object,
		homeLoaded: PropTypes.bool
	};

	componentWillMount() {
		if (typeof window !== 'undefined')
			window.scrollTo(0, 0)

		const {actions, homeLoaded} = this.props;

		if(!homeLoaded) {
			actions.loadHomePage();
		}
	}

	render() {
		const {dataLoaded, homeLoaded, homeData} = this.props;

		if (!dataLoaded || !homeLoaded) {
				return null;
		}

		return (
			<div id="home">
				<h1>{homeData.get('name')}</h1>
			</div>
		);
	}
}

function preload() {
	return [
		[loadHome]
	];
}

HomePage.preload = preload;

function mapStateToProps(state) {
	return {
		homeLoaded: selectHomeLoaded(state),
		homeData: selectHomeData(state),
		dataLoaded: selectDataLoaded(state),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(viewActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps,)(HomePage);
