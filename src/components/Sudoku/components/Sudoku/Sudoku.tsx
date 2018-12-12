import * as _ from "lodash";
import * as React from 'react';
import BEMComponent from "../../../../libs/BEM/BEMComponent";
import DEMO_TASK from '../../demo-task.json';
import {
	calcHintsToTask, driveToHorizontal,
	driveToVertical, genCell, genDefaultTask, ICell,
	IValidResult, setMainCells, valid
} from '../../libs';
import {
	DIRECTIONS_DRIVING,
	DIRECTIONS_DRIVING_DOWN,
	DIRECTIONS_DRIVING_LEFT,
	DIRECTIONS_DRIVING_RIGHT,
	DIRECTIONS_DRIVING_UP
} from "../../libs/constants";
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

		this.binder();
	}

	public binder() {
		this.doOpenKeyboard = this.doOpenKeyboard.bind(this);
		this.closeKeyboard = this.closeKeyboard.bind(this);
		this.setCellValue = this.setCellValue.bind(this);
		this.setCurrentCell = this.setCurrentCell.bind(this);
		this.changeCurrentCellKey = this.changeCurrentCellKey.bind(this);
		this.keyUpF2DoOpenKeyboard = this.keyUpF2DoOpenKeyboard.bind(this);
		this.fixMainCells = this.fixMainCells.bind(this);
		this.setHints = this.setHints.bind(this);
	}

	public setStateTask(task: ICell[]) {
		const currentStateTask: ICell[] = _.get(this.state, 'currentStateTask', []);

		if (currentStateTask.length) {
			this.historyPush(currentStateTask);

			this.setState((state) => {
				return {...state, currentStateTask: task}
			});
		}
	}

	public setStateHistoryNeedWrite(historyNeedWrite: boolean = true) {
		this.setState((state) => {
			return {...state, historyNeedWrite}
		});
	}

	public getStateHistoryNeedWrite() {
		return _.get(this.state, 'historyNeedWrite', false);
	}

	public setCurrentCell(cell: ICell) {
		this.setState((state) => ({
			...state,
			currentCell: cell
		}));
	}

	public doOpenKeyboard(cell: ICell) {
		this.setCurrentCell(cell);

		this.setState((state) => ({
			...state,
			keyboardCell: cell,
			keyboardIsOpen: !cell.isMain,
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
		this.setState((state) => ({
			...state,
			keyboardCell: {},
			keyboardIsOpen: false,
		}));
	}

	public historyPush(stateTask: ICell[]) {
		if (this.getStateHistoryNeedWrite()) {
			const history = _.get(this.state, 'history', []);
			history.push(stateTask);

			this.setState((state) => ({
				...state,
				'history': history
			}));
		}
	}

	public setCellValue(cell: ICell) {
		const currentStateTask: ICell[] = _.get(this.state, 'currentStateTask', []);

		if (currentStateTask.length) {
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
			const resValid: IValidResult = valid(newStateTask);

			if (resValid.isValid) {
				this.closeKeyboard();

				this.setStateTask(newStateTask);
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
		let keyboardIsOpen: boolean = _.get(this.state, 'keyboardIsOpen');

		this.closeKeyboard();

		let newCurrentCell: ICell = genCell(0, 0, 0);

		if (currentCellKey.length > 1) {
			const currentCell: ICell = _.get(this.state, 'currentCell');

			keyboardIsOpen = !currentCell.isMain ? keyboardIsOpen : false;

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

	public fixMainCells() {
		const currentStateTask = _.get(this.state, 'currentStateTask');
		this.setStateTask(setMainCells(currentStateTask));
		this.setStateHistoryNeedWrite();
	}

	public setHints() {
		const currentStateTask: ICell[] = _.get(this.state, 'currentStateTask');
		this.setStateTask(calcHintsToTask(currentStateTask));
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
					<SudokuBar
						setHints={this.setHints}
						fixMainCells={this.fixMainCells}/>
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
