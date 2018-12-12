import * as _ from "lodash";
import * as React from 'react';
import BEMComponent from "../../../../libs/BEM/BEMComponent";
import DEMO_TASK from '../../demo-task.json';
import {genCell, ICell, valid} from '../../libs';
import {
	DIRECTIONS_DRIVING,
	DIRECTIONS_DRIVING_DOWN,
	DIRECTIONS_DRIVING_LEFT,
	DIRECTIONS_DRIVING_RIGHT,
	DIRECTIONS_DRIVING_UP
} from "../../libs/constants";
import {driveToHorizontal, driveToVertical, genDefaultTask} from "../../libs/other";
import SudokuBar from "../SudokuBar/SudokuBar";
import SudokuGrid from "../SudokuGrid/SudokuGrid";
import SudokuKeyboard from "../SudokuKeyboard/SudokuKeyboard";
import "./Sudoku.css";


export type fnDoOpenKeyboard = (cell: ICell) => void;
export type fnCloseKeyboard = () => void;
export type fnSetCellValue = (cell: ICell) => void;

class Sudoku extends BEMComponent {

	constructor(props: any) {
		super(props);

		this.componentName = 'sudoku';

		const task: ICell[] = DEMO_TASK || genDefaultTask();


		this.state = {
			...this.state,
			currentCell: {},
			currentStateTask: task,
			history: [],
			historyNeedWrite: false,
			keyboardCell: {},
			keyboardIsOpen: false,
			keyboardWrongValue: null,
			taskDefault: task,
		};

		this.doOpenKeyboard = this.doOpenKeyboard.bind(this);
		this.closeKeyboard = this.closeKeyboard.bind(this);
		this.setCellValue = this.setCellValue.bind(this);
		this.setCurrentCell = this.setCurrentCell.bind(this);
		this.changeCurrentCellKey = this.changeCurrentCellKey.bind(this);
		this.keyUpF2DoOpenKeyboard = this.keyUpF2DoOpenKeyboard.bind(this);
	}

	public setCurrentCell(cell: ICell) {
		this.setState((state) => {

			return {
				...state,
				currentCell: cell
			}
		});
	}

	public doOpenKeyboard(cell: ICell) {
		this.setCurrentCell(cell);

		this.setState((state) => ({
			...state,
			keyboardCell: cell,
			keyboardIsOpen: true,
			keyboardWrongValue: null,
		}));
	}

	public keyUpF2DoOpenKeyboard(event: any) {
		if (event.key === 'F2') {
			const currentCellKey: string = _.get(this.state, 'currentCell.key', '');
			if (currentCellKey) {
				const currentCell: ICell = _.get(this.state, 'currentCell');
				this.doOpenKeyboard(currentCell);
			}
		}
	}

	public closeKeyboard() {
		this.setState({
			...this.state,
			keyboardCell: {},
			keyboardIsOpen: false,
		});
	}

	public historyPush(stateTask: ICell[]) {
		const historyNeedWrite = _.get(this.state, 'historyNeedWrite', false);
		if (historyNeedWrite) {
			const history = _.get(this.state, 'history', []);
			history.push(stateTask);

			this.setState({
				...this.state,
				'history': history
			})
		}
	}

	public setCellValue(cell: ICell) {
		const currentStateTask: ICell[] = _.get(this.state, 'currentStateTask', []);

		if (currentStateTask) {
			const newStateTask = _.map(currentStateTask, (currentCeil: ICell) => {
				if (currentCeil.key === cell.key) {
					return {
						...currentCeil,
						value: cell.value
					}

				} else {
					return currentCeil;
				}
			});

			if (valid(newStateTask)) {
				this.closeKeyboard();
				this.historyPush(currentStateTask);

				this.setState((state) => {
					return {...state, currentStateTask: newStateTask}
				});
			} else {
				this.setState((state) => {
					return {...state, keyboardWrongValue: cell.value}
				});
			}
		}
	}

	public changeCurrentCellKey(event: any) {
		if (DIRECTIONS_DRIVING.indexOf(event.key) === -1) {
			return;
		}
		const currentCellKey: string = _.get(this.state, 'currentCell.key', '');
		const keyboardIsOpen: boolean = _.get(this.state, 'keyboardIsOpen');

		this.closeKeyboard();

		let newCurrentCell: ICell = genCell(0, 0, 0);

		if (currentCellKey.length > 1) {
			const currentCell: ICell = _.get(this.state, 'currentCell');

			switch (event.key) {
				case DIRECTIONS_DRIVING_RIGHT:
					newCurrentCell = driveToHorizontal(currentCell);
					break;
				case DIRECTIONS_DRIVING_LEFT:
					newCurrentCell = driveToHorizontal(currentCell, -1);
					break;

				case DIRECTIONS_DRIVING_UP:
					newCurrentCell = driveToVertical(currentCell, -1);
					break;
				case DIRECTIONS_DRIVING_DOWN:
					newCurrentCell = driveToVertical(currentCell);
					break;
			}
		}

		this.setCurrentCell(newCurrentCell);

		if (keyboardIsOpen) {
			this.doOpenKeyboard(newCurrentCell);
		}
	}

	public render() {
		const currentCellKey = _.get(this.state, 'currentCell.key', '');
		const keyboardWrongValue = _.get(this.state, 'keyboardWrongValue', null);
		const currentStateTask = _.get(this.state, 'currentStateTask');
		const keyboardIsOpen = _.get(this.state, 'keyboardIsOpen', false);
		const keyboardCell = _.get(this.state, 'keyboardCell', {});

		return (
			<div className={this.block()}>
				<div className={this.elem('bar')}>
					<SudokuBar/>
				</div>

				<div className={this.elem('grid')}>
					<SudokuGrid
						currentCellKey={currentCellKey}
						currentStateTask={currentStateTask}
						doOpenKeyboard={this.doOpenKeyboard}
					/>
				</div>

				{keyboardIsOpen && keyboardCell && <SudokuKeyboard
					cell={keyboardCell}
					keyboardWrongValue={keyboardWrongValue}
					setCellValue={this.setCellValue}
					closeKeyboard={this.closeKeyboard}
				/>}
			</div>
		);
	}


	public componentDidMount() {
		window.addEventListener('keydown', this.changeCurrentCellKey);
		window.addEventListener('keyup', this.keyUpF2DoOpenKeyboard);
	}

	public componentWillUnmount() {
		window.removeEventListener('keydown', this.changeCurrentCellKey);
		window.addEventListener('keyup', this.keyUpF2DoOpenKeyboard);
	}
}

export default Sudoku;
