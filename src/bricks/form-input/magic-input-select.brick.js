import {Brick}    from "zengular";
import twig       from "./magic-input-select.twig";
import "./magic-input-select.scss";
import MagicInput from "./magic-input";


@Brick.register('magic-input-select', twig)
export default class MagicInputSelectBrick extends MagicInput {

	readDataset() {
		let attributes = super.readDataset();
		if (typeof attributes.options) attributes.options = attributes.options.split(',').map(item => item.trim());
		return attributes;
	}

	static setAttributes(options) {return {options};}

}
