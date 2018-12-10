import * as React from 'react';
import {BEM, IBEMProps} from "../../libs/BEM/BEM";
import Sudoku from "../Sudoku";
import './App.css';

const componentName = 'app';


function App(props: IBEMProps) {
	return (
		<div className={props.block()}>
			<h1 className={props.elem('title')}>Судоку</h1>
			<div className={props.elem('content')}>
				<div className={props.elem('sudoku')}>
					<Sudoku/>
				</div>
			</div>
		</div>
	);
}

export default BEM(App, componentName);
