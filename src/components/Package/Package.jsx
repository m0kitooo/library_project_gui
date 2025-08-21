import React, { useState } from "react";
import styles from "./Package.module.css";

export default function Package({ packageName, children }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={styles.packageWrapper}>
			<div className={`${styles.titleWrapper} ${styles.interactiveElement}`} onClick={() => setIsOpen(!isOpen)}>
				<svg fill="#ffffffde" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<g data-name="Layer 2">
						<g data-name="arrow-ios-back" transform={isOpen ? "rotate(270 12 12)" : "rotate(180 12 12)"}>
							<rect width="24" height="24" transform="rotate(90 12 12)" opacity="0" />
							<path d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z" />
						</g>
					</g>
				</svg>
				<span>{packageName}</span>
			</div>
			<ul style={{ display: isOpen ? "block" : "none" }}>
				{React.Children.map(children, (child, idx) => (
					<li key={idx} className={`${styles.liElem} ${styles.interactiveElement}`}>{child}</li>
				))}
			</ul>
		</div>
	);
}
