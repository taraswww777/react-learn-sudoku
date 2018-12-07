import * as React from "react";
import BEMComponent from "./BEMComponent";


// export type fnBEM = (WrapComponent: React.Component | any, componentName: string) => any;
export type fnBEMBlock = (mod?: string, modValue?: string) => string;
export type fnBEMElem = (nameElement: string, mod?: string, modValue?: string) => string;
export type fnBEMEJoinClasses = (classes: string[]) => string;

export interface IBEMProps {
	componentName: string;
	block: fnBEMBlock;
	elem: fnBEMElem;
	joinClasses: fnBEMEJoinClasses;
}


export function BEM(BEMWrapComponent: React.Component | any, componentName: string = 'BEM'): any {

	return class BemComponentHoc extends BEMComponent {

		public render() {
			return <BEMWrapComponent
				componentName={componentName}
				joinClasses={this.joinClasses}
				block={this.block}
				elem={this.elem}
			/>;
		}
	}
}

