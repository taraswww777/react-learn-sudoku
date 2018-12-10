import * as React from 'react';
import {BEM, IBEMProps} from "../../../../libs/BEM/BEM";
import {fnOpenKeyboard} from "../Sudoku/Sudoku";
import "./SudokuCell.css";

export const MIN_POS_X = 0;
export const MIN_POS_Y = 0;

export const MAX_POS_X = 9;
export const MAX_POS_Y = 9;

export interface ICell {
	key: string,
	posX: number,
	posY: number,
	value?: number | 0,
}

export function genCell(posX: number, posY: number, value: number = 0): ICell {
	return {
		'key': posX + '-' + posY,
		'posX': posX,
		'posY': posY,
		'value': value,
	}
}


export interface ISudokuCellProps extends IBEMProps {
	cell: ICell;
	openKeyboard: fnOpenKeyboard
}

const componentName = 'sudoku-cell';

function onClickOpenKeyboard(cell: ICell, openKeyboard: fnOpenKeyboard) {
	return () => {
		openKeyboard(cell);
	}
}


function SudokuCell(props: ISudokuCellProps) {
	return (
		<div className={props.block()} onClick={onClickOpenKeyboard(props.cell, props.openKeyboard)}>
			{props.cell.value ? props.cell.value : ''}
		</div>
	);

}

export default BEM(SudokuCell, componentName);
