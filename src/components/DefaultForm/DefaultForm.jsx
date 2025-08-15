import styles from "./DefaultFrom.module.css";

export default function DefaultForm({ children, onSubmit }) {
  const handleSubmit = event => {
		event.preventDefault();
		onSubmit(event);
	}
  
	return (
    <form onSubmit={handleSubmit} className={styles.defaultForm}>
        {children}
    </form>
  );
}
