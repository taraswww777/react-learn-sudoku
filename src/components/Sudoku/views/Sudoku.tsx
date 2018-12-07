import * as _ from "lodash";
import * as React from 'react';
import BEMComponent from "../../../libs/BEM/BEMComponent";
import {genCell, ICell, MAX_POS_X, MAX_POS_Y, MIN_POS_X, MIN_POS_Y} from "../core/Cell";
import "../css/Sudoku.css";
import SudokuKeyboard from "./SudokuKeyboard";

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

	public openKeyboard(cellKey: string) {
		// TODO: открытие окна для ввода числа
		console.log('openKeyboard:cellKey:', cellKey);

	// noinspection RequiredAttributes
		return (<SudokuKeyboard cellKey={cellKey}/>);
	}

	public onClickOpenKeyboard(cellKey: string) {
		// return (event: React.MouseEvent<HTMLElement>) => {
		return () => {
			this.openKeyboard(cellKey);
		}
	}

	public renderCells(cells: ICell[]): any {
		return (
			<div className={this.elem('grid')}>{_.map(cells, (cell: ICell) => this.renderCell(cell))}</div>
		);
	}

	public renderCell(cell: ICell): any {
		return (
			<div
				onClick={this.onClickOpenKeyboard(cell.key)}
				className={
					this.joinClasses(this.elem('cell', 'pos', cell.key))}
				key={cell.key}
			>{cell.value}</div>
		);
	}




	public render() {
		const currentStateTask = _.get(this.state, 'currentStateTask');

		return (
			<div className={this.block()}>
				{currentStateTask && this.renderCells(currentStateTask)}
				{this.openKeyboard('0-0')}
			</div>
		);
	}
}

export default Sudoku;
