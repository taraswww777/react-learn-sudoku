import * as _ from "lodash";
import * as React from 'react';
import BEMComponent from "../../../../libs/BEM/BEMComponent";
import SudokuCell, {genCell, ICell, MAX_POS_X, MAX_POS_Y, MIN_POS_X, MIN_POS_Y} from "../SudokuCell/SudokuCell";
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
			currentStateTask: task,
			history: [],
			keyboardCell: {},
			keyboardIsOpen: false,
			taskDefault: task,
		};

		this.openKeyboard = this.openKeyboard.bind(this);
		this.closeKeyboard = this.closeKeyboard.bind(this);
		this.setCellValue = this.setCellValue.bind(this);
	}

	public openKeyboard(cell: ICell) {
		this.setState({
			...this.state,
			keyboardCell: cell,
			keyboardIsOpen: true,
		});
	}

	public closeKeyboard() {
		this.setState({
			...this.state,
			keyboardCell: {},
			keyboardIsOpen: false,
		});
	}

	public setCellValue(cell: ICell) {
		const history = _.get(this.state, 'history', []);
		const currentStateTask = _.get(this.state, 'currentStateTask', []);
		history.push(currentStateTask);

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
			this.closeKeyboard();

			this.setState((state) => {
				return {...state, 'history': history, currentStateTask: newStateTask}
			});


		}
	}

	public render() {
		const currentStateTask = _.get(this.state, 'currentStateTask');
		const keyboardIsOpen = _.get(this.state, 'keyboardIsOpen', false);
		const keyboardCell = _.get(this.state, 'keyboardCell', {});

		return (
			<div className={this.block()}>
				{currentStateTask && <div className={this.elem('grid')}>
					{_.map(currentStateTask, (cell: ICell) => <div
							className={this.elem('cell', 'pos', cell.key)}
							key={cell.key}>
							<SudokuCell
								openKeyboard={this.openKeyboard}
								cell={cell}/>
						</div>
					)}
				</div>}

				{keyboardIsOpen && keyboardCell && <SudokuKeyboard
					cell={keyboardCell}
					setCellValue={this.setCellValue}
					closeKeyboard={this.closeKeyboard}
				/>}
			</div>
		);
	}
}

export default Sudoku;
