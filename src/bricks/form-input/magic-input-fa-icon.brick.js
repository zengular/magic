import {Brick} from "zengular";
import twig    from "./magic-input-fa-icon.twig";
import "./magic-input-fa-icon.scss";
import magic   from "../../modules/magic";
import MagicInput from "./magic-input";


@Brick.register('magic-input-fa-icon', twig)
export default class MagicInputFaIconBrick extends MagicInput {
	get value() {
		let style = this.$$("style").node.value;
		let icon = 'fa-' + this.$$("input").node.value;
		return style + ' ' + icon;
	}

	set value(value) {
		if (value) {
			value = value.split(' ');
			let style = value[0];
			let icon = value[1].substr(3);
			this.$$("style").node.value = style;
			this.$$("input").node.value = icon;
			this.setIcon();
		}
	}

	onRender() {
		this.$$("input").listen('input', () => this.setIcon());
		this.$$("style").listen('input', () => this.setIcon());
	}

	setIcon(data) {
		let classList = this.$$('icon').node.classList;
		while (classList.length > 0) {
			classList.remove(classList.item(0));
		}
		let style = this.$$('style').node.value;
		let icon = this.$$('input').node.value;
		classList.add(style);
		try {
			if (icon) classList.add('fa-' + icon);
		} catch (e) {}
	}
}
