import * as React from 'react';
import {BEM, IBEMProps} from "../../../../libs/BEM/BEM";
import "./SudokuBar.css";

const COMPONENT_NAME = 'sudoku-bar';

export interface ISudokuBarProps extends IBEMProps {
	fixMainCells: any;
	setHints?: any;
}

function SudokuBar(props: ISudokuBarProps) {
	return (
		<div className={props.block()}>
			<button
				className={props.elem('btn', 'run')}
				onClick={props.fixMainCells}
			>fix Main Cells
			</button>

			<button
				className={props.elem('btn', 'run')}
				onClick={props.setHints}
			>set Hints
			</button>
		</div>
	);
}

export default BEM(SudokuBar, COMPONENT_NAME);
