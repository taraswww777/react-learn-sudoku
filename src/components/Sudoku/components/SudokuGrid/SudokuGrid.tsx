import * as _ from "lodash";
import * as React from 'react';
import {BEM, IBEMProps} from "../../../../libs/BEM/BEM";
import {ICell} from "../../libs";
import {fnDoOpenKeyboard} from "../Sudoku/Sudoku";
import SudokuCell from "../SudokuCell/SudokuCell";
import "./SudokuGrid.css";

export interface ISudokuGridProps extends IBEMProps {
	currentCellKey: string;
	currentStateTask: ICell[];
	doOpenKeyboard: fnDoOpenKeyboard;
}

const COMPONENT_NAME = 'sudoku-grid';

function SudokuGrid(props: ISudokuGridProps) {
	const currentCellKey = _.get(props, 'currentCellKey', '');
	const currentStateTask = _.get(props, 'currentStateTask');

	return (
		<div className={props.block()}>
			{currentStateTask && _.map(currentStateTask, (cell: ICell) =>
				<div
					key={cell.key}
					className={props.joinClasses(
						props.elem('cell', 'pos', cell.key),
						props.elem('cell', currentCellKey === cell.key ? 'current' : ''),
						props.elem('cell', cell.isMain ? 'is-main' : '')
					)}>
					<SudokuCell
						openKeyboard={props.doOpenKeyboard}
						cell={cell}/>
				</div>
			)}
		</div>
	);
}

export default BEM(SudokuGrid, COMPONENT_NAME);
