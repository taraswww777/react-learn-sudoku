import * as React from 'react';
import {BEM, IBEMProps} from "../../../../libs/BEM/BEM";
import {ICell} from "../../libs";
import {fnDoOpenKeyboard} from "../Sudoku/Sudoku";
import "./SudokuCell.css";

export interface ISudokuCellProps extends IBEMProps {
	cell: ICell;
	openKeyboard: fnDoOpenKeyboard
}

const componentName = 'sudoku-cell';

function onClickOpenKeyboard(cell: ICell, openKeyboard: fnDoOpenKeyboard) {
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
