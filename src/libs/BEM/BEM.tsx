import * as React from "react";
import BEMComponent, {fnBEMBlock, fnBEMEJoinClasses, fnBEMElem} from "./BEMComponent";


// export type fnBEM = (WrapComponent: React.Component | any, componentName: string) => any

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
				{...this.props}
				componentName={componentName}
				joinClasses={this.joinClasses}
				block={this.block}
				elem={this.elem}
			/>;
		}
	}
}

