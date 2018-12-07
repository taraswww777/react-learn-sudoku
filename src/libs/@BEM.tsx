import * as React from "react";


type fnBEMBlock = (mod?: string, modValue?: string) => string;
type fnBEMElem = (nameElement: string, mod?: string, modValue?: string) => string;

export interface IBEMProps {
	block: fnBEMBlock;
	elem: fnBEMElem;
}


function BEM(WrapComponent: React.Component | any, componentName: string = 'undefinedComponentName') {
	return class BemComponent extends React.Component {

		public static block(mod: string = '', modValue: string = '') {
			let className = componentName;

			if (mod !== '') {
				className += ' ' + componentName + '--' + mod;
				if (modValue !== '') {
					className += '_' + modValue;
				}
			}

			return className;
		}

		public static elem(nameElement: string, mod = '', modValue = '') {
			let className = componentName + '__' + nameElement;

			if (mod !== '') {
				className += ' ' + componentName + '__' + nameElement + '--' + mod;
				if (modValue !== '') {
					className += '_' + modValue;
				}
			}
			return className;
		}

		public render() {
			return <WrapComponent block={BemComponent.block} elem={BemComponent.elem} {...this.props}/>;
		}

	}
}

export default BEM;
