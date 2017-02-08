import React, { Component, PropTypes } from 'react';

// STYLES
import styles from './burger.css';

export default class Burger extends Component {
	static propTypes = {
		active: PropTypes.bool,
		onClick: PropTypes.func.isRequired,
	};

	shouldComponentUpdate(nextProps) {
		return nextProps.active !== this.props.active || nextProps.hidden !== this.props.hidden;
	}

	onClick = () => {
		this.props.onClick();
	};

	render() {
		const { active, hidden, footer } = this.props;

		const activeClass = active ? '-active' : '';
		const hiddenClass = hidden ? '-hidden' : '';
		const footerClass = footer ? '-white' : '';
		const burgerClass = `burger${footerClass}${activeClass}${hiddenClass}`

		return (
			<div className={styles['burger-container']}>
				<button className={styles[burgerClass]} onClick={this.onClick}>
					<span className={styles[`burger-inner-top${activeClass}`]}></span>
					<span className={styles[`burger-inner${activeClass}`]}></span>
					<span className={styles[`burger-inner-bottom${activeClass}`]}></span>
				</button>
			</div>
		);
	}
}
