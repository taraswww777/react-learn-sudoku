import * as React from 'react';
import {BEM, IBEMProps} from "../../../../libs/BEM/BEM";
import "./SudokuBar.css";

const COMPONENT_NAME = 'sudoku-bar';

export interface ISudokuBarProps extends IBEMProps {
	fixMainCells?: any
}

function SudokuBar(props: ISudokuBarProps) {
	return (
		<div className={props.block()}>
			<button
				className={props.elem('btn', 'run')}
				onClick={props.fixMainCells}
			>fixMainCells
			</button>
		</div>
	);
}

export default BEM(SudokuBar, COMPONENT_NAME);
