import { useState } from 'react';
import styles from './index.module.css';

export const App = () => {
	const [error, setError] = useState(false);
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);

	const onClickNewMessage = () => {
		setValue('');
		setError(false);
		const input = prompt('')?.trim();

		input.length < 3 ? setError(true) : setValue(input);
	};

	const onClickAddList = () => {
		if (value) {
			setList(prevList => [
				...prevList,
				{ id: Date.now(), date: new Date().toLocaleString('ru-Ru'), value },
			]);
		}
		setValue('');
	};

	const itemList = list.map(({ id, date, value }) => (
		<li className={styles.listItem} key={id}>
			{value} - {date}
		</li>
	));

	return (
		<div className={styles.app}>
			<h1 className={styles.pageHeading}>Ввод значения</h1>
			<p className={styles.noMarginText}>
				Текущее значение <code>value</code>: "
				<output className={styles.currentValue}>{value}</output>"
			</p>
			{error && (
				<div className={styles.error}>
					Введенное значение должно содержать минимум 3 символа
				</div>
			)}
			<div className={styles.buttonsContainer}>
				<button className={styles.button} onClick={onClickNewMessage}>
					Ввести новое
				</button>
				<button
					className={styles.button}
					onClick={onClickAddList}
					disabled={error || !value}>
					Добавить в список
				</button>
			</div>
			<div className={styles.listContainer}>
				<h2 className={styles.listHeading}>Список:</h2>
				{!list.length && (
					<p className={styles.noMarginText}>Нет добавленных элементов</p>
				)}
				<ul className={styles.list}>{itemList}</ul>
			</div>
		</div>
	);
};
