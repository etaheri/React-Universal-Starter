import React from 'react';

// STYLES
import styles from './button-dropdown.css';

function ButtonDropdown(props) {

		const { label, direction } = props;

		return (
			<div className={styles.root}>
				<span className={styles['button-background']}></span>
				<span className={styles['button-label']}> { label }</span>
				<span className={direction ? styles['arrow-down-active'] : styles['arrow-down'] }></span>
			</div>
		);
}

export default ButtonDropdown;
