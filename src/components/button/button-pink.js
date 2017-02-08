import React from 'react';
import {Link} from 'react-router';
import {scroller} from 'react-scroll';

// STYLES
import styles from './button-pink.css';

function ButtonPink(props) {

		const { label, to, large } = props;
		
		const scrollTo = (el) => {
			return () => scroller.scrollTo(el, {
				duration: 500,
				delay: 0,
				smooth: true,
			})
		}
		return (
			<div className={styles.root}>
				<Link className={styles['button-link']} onClick={scrollTo(to)}>
					<span className={styles['button-background']}></span>
					<span className={large ? styles['button-label-lg'] : styles['button-label']}> { label }</span>
				</Link>
			</div>
		);
}

export default ButtonPink;
