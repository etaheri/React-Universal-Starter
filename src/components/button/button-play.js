import React from 'react';
import { Link } from 'react-router';

// STYLES
import styles from './button-play.css';

function PlayButton(props) {

		const {to} = props;

		return (
			<div className={styles.root}>
				<Link className={styles['button-link']} to={to}>
					<span className={styles['button-play']}></span>
  					<span className={styles['button-background']}></span>
				</Link>
			</div>
		);
}

export default PlayButton;
