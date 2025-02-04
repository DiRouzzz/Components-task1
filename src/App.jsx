import { useState } from 'react';
import styles from './index.module.css';

function App() {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');
	const [isValueValid, setIsValueValid] = useState(false);

	const errorText = <div className={styles.error}>{error}</div>;
	const marginText = (
		<p className={styles.noMarginText}>Нет добавленных элементов</p>
	);

	const formattedDate = () => {
		return new Date().toLocaleString('ru-RU', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		});
	};

	const onInputButtonClick = () => {
		const promptValue = prompt();
		if (promptValue.length < 3) {
			setIsValueValid(false);
			setError('Введенное значение должно содержать минимум 3 символа');
		} else {
			setIsValueValid(true);
			setError('');
			setValue(promptValue);
		}
	};

	const onAddButtonClick = () => {
		if (isValueValid) {
			setList(prev => [
				...prev,
				{ id: Date.now(), value, date: formattedDate() },
			]);
			setValue('');
			setError('');
			setIsValueValid(false);
		}
	};

	const items = list.map(({ id, value, date }) => (
		<li className={styles.listItem} key={id}>
			{date} - {value}
		</li>
	));

	return (
		<>
			<div className={styles.app}>
				<h1 className={styles.pageHeading}>Ввод значения</h1>
				<p className={styles.noMarginText}>
					Текущее значение <code>value</code>: "{value}
					<output className={styles.currentValue}></output>"
				</p>
				{error !== '' && errorText}
				<div className={styles.buttonsContainer}>
					<button className={styles.button} onClick={onInputButtonClick}>
						Ввести новое
					</button>
					<button
						className={styles.button}
						disabled={!isValueValid}
						onClick={onAddButtonClick}>
						Добавить в список
					</button>
				</div>
				<div className={styles.listContainer}>
					<h2 className={styles.listHeading}>Список:</h2>
					{list.length === 0 && marginText}
					<ul className={styles.list}>{items}</ul>
				</div>
			</div>
		</>
	);
}

export default App;
