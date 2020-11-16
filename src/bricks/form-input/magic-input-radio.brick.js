import {Brick}    from "zengular";
import twig       from "./magic-input-radio.twig";
import "./magic-input-radio.scss";
import MagicInput from "./magic-input";


@Brick.register('magic-input-radio', twig)
export default class MagicInputRadioBrick extends MagicInput {

	readDataset() {
		let attributes = super.readDataset();
		if (typeof attributes.options) attributes.options = attributes.options.split(',').map(item => item.trim());
		return attributes;
	}

	static setAttributes(options) {return {options: options};}

	get value() {
		let value = null;
		return this.$$('input').filter(':checked').node?.value;
	}


	set value(value) {
		this.$$("input").each(input => {input.removeAttribute("checked")});
		if (value) this.$$("input").filter(`[value=${value}]`).each(item => item.checked = true);
	}


}
