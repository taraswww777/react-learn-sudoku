import * as _ from "lodash";
import * as React from 'react';
import BEMComponent from "../../../libs/@BEMClass";
import {genCell, ICell, MAX_POS_X, MAX_POS_Y, MIN_POS_X, MIN_POS_Y} from "../core/Cell";
import "../css/Sudoku.css";

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

		this.state = {...this.state, taskDefault: task, currentStateTask: task};
	}

	public renderCells(cells: ICell[]): any {
		return (
			<div className={this.elem('grid')}>{_.map(cells, (cell: ICell) => this.renderCell(cell))}
			</div>
		);

	}

	public renderCell(cell: ICell): any {
		let key = cell.posX + '-' + cell.posY;
		return (
			<div className={this.elem('cell', 'pos', key)} key={key}>{cell.value}</div>
		);

	}

	public render() {
		const currentStateTask = _.get(this.state, 'currentStateTask');
		console.log('currentStateTask:', currentStateTask);

		return (
			<div className={this.block()}>
				{currentStateTask && this.renderCells(currentStateTask)}
			</div>
		);
	}
}

export default Sudoku;
