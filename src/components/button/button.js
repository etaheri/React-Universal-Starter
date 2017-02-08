import React from 'react';
import { Link } from 'react-router';
import {scroller} from 'react-scroll';

// STYLES
import styles from './button.css';

function Button(props) {

		const scrollTo = (el) => {
			return () => scroller.scrollTo(el, {
				duration: 500,
				delay: 0,
				smooth: true,
			})
		}

		const { label, to, large, scrollEl, action } = props;

		return (
			<div className={styles.root}>
				{ scrollEl ?
					 <div className={styles['button-link']} onClick={scrollTo(scrollEl)}>
				        <span className={styles['button-background']}></span>
					    <span className={large ? styles['button-label-lg'] : styles['button-label']}> { label }</span>
				    </div>
				 : action ?
				 	<div className={styles['button-link']} onClick={action}>
				        <span className={styles['button-background']}></span>
					    <span className={large ? styles['button-label-lg'] : styles['button-label']}> { label }</span>
				    </div>
				 : <Link className={styles['button-link']} to={to}>
						<span className={styles['button-background']}></span>
						<span className={large ? styles['button-label-lg'] : styles['button-label']}> { label }</span>
					</Link>
				}
			</div>
		);
}

export default Button;
