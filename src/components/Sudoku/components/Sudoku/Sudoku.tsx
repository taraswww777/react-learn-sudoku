import * as _ from "lodash";
import * as React from 'react';
import BEMComponent from "../../../../libs/BEM/BEMComponent";
import {genCell, ICell, MAX_POS_X, MAX_POS_Y, MIN_POS_X, MIN_POS_Y, valid} from '../../libs';
import SudokuCell from "../SudokuCell/SudokuCell";
import SudokuKeyboard from "../SudokuKeyboard/SudokuKeyboard";
import "./Sudoku.css";

export type fnOpenKeyboard = (cell: ICell) => void;
export type fnCloseKeyboard = () => void;
export type fnSetCellValue = (cell: ICell) => void;

class Sudoku extends BEMComponent {

	constructor(props: any) {
		super(props);

		this.componentName = 'sudoku';

		let task: ICell[] = [];

		for (let posX = MIN_POS_X; posX < MAX_POS_X; posX++) {
			for (let posY = MIN_POS_Y; posY < MAX_POS_Y; posY++) {
				task.push(genCell(posX, posY));
			}
		}

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

		this.openKeyboard = this.openKeyboard.bind(this);
		this.closeKeyboard = this.closeKeyboard.bind(this);
		this.setCellValue = this.setCellValue.bind(this);
		this.setCurrentCell = this.setCurrentCell.bind(this);
	}

	public setCurrentCell(cell: ICell) {
		this.setState((state) => {

			return {
				...state,
				currentCell: cell
			}
		});
	}

	public openKeyboard(cell: ICell) {
		this.setCurrentCell(cell);

		this.setState((state) => ({
			...state,
			keyboardCell: cell,
			keyboardIsOpen: true,
			keyboardWrongValue: null,
		}));
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

	public render() {
		const currentCellKey = _.get(this.state, 'currentCell.key', '');
		const keyboardWrongValue = _.get(this.state, 'keyboardWrongValue', null);
		const currentStateTask = _.get(this.state, 'currentStateTask');
		const keyboardIsOpen = _.get(this.state, 'keyboardIsOpen', false);
		const keyboardCell = _.get(this.state, 'keyboardCell', {});

		return (
			<div className={this.block()}>
				{currentStateTask && <div className={this.elem('grid')}>
					{_.map(currentStateTask, (cell: ICell) => <div
							className={this.joinClasses(
								this.elem('cell', 'pos', cell.key),
								this.elem('cell', currentCellKey === cell.key ? 'current' : '')
							)
							}
							key={cell.key}>
							<SudokuCell
								openKeyboard={this.openKeyboard}
								cell={cell}/>
						</div>
					)}
				</div>}

				{keyboardIsOpen && keyboardCell && <SudokuKeyboard
					cell={keyboardCell}
					keyboardWrongValue={keyboardWrongValue}
					setCellValue={this.setCellValue}
					closeKeyboard={this.closeKeyboard}
				/>}
			</div>
		);
	}
}

export default Sudoku;
