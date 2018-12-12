import _ from 'lodash';
import * as React from 'react';
import {BEM, IBEMProps} from "../../../../libs/BEM/BEM";
import "./SudokuCellHints.css";

export interface ISudokuCellProps extends IBEMProps {
	hints: number[]
}

const componentName = 'sudoku-cell-hints';


function SudokuCellHints(props: ISudokuCellProps) {
	return (
		<div className={props.block()}>
			{_.map(props.hints, (hint: number) =>
				<div className={props.elem('item', 'val', hint.toString())}>{hint}</div>
			)}
		</div>
	);

}

export default BEM(SudokuCellHints, componentName);
