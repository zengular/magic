import {Brick}    from "zengular";
import twig       from "./magic-input-checkboxes.twig";
import "./magic-input-checkboxes.scss";
import MagicInput from "./magic-input";


@Brick.register('magic-input-checkboxes', twig)
export default class MagicInputCheckboxesBrick extends MagicInput {

	createViewModel() {
		let viewModel = super.createViewModel();
		viewModel.options = typeof this.dataset.options !== "undefined" ? this.dataset.options.split(',').map(item=>item.trim()) : (this.props ? this.props.options : []);
		return viewModel;
	}

	get value() {
		let checked = [];
		this.$$('input').nodes.forEach(input => {
			if (input.checked === true) checked.push(input.value);
		});
		return checked;
	}


	set value(value) {
		if (!Array.isArray(value)) value = [value];
		value.forEach(value => {
			this.$$("input").filter('[value="' + value + '"]').each(item => item.checked = true);
		});
	}


}
