import {Brick} from "zengular";
import "./magic-form.scss";
import magic   from "../modules/magic";


export default class MagicFormBrick extends Brick {
	onInitialize() {
		this.item = {};
		this.props = {};
		this.root.classList.add('magic-form');
		this.handler = magic.getHandler(this.dataset.handler);
	}

	createViewModel() {
		return {
			item: this.item,
			props: this.props,
			dataset: this.dataset,
			handler: this.handler
		}
	}

	setup(item, props) {
		this.item = item;
		this.props = props;
		this.render()
			.then(() => {
				this.$$('input').each(input => {
					let wrapper = document.createElement('div');
					let label = document.createElement('label');
					label.innerHTML = this.handler.translate(['input', input.dataset.name]);

					let hint = this.$('.hint[data-for="' + input.dataset.name + '"]').node;
					if (hint !== null) {
						label.classList.add('hinted');
						label.addEventListener('click', event => hint.classList.toggle('visible'));
						input.after(hint);

					}

					wrapper.classList.add('input');
					wrapper.dataset.name = input.dataset.name;
					wrapper.appendChild(label);
					input.parentElement.insertBefore(wrapper, input);
					wrapper.appendChild(input);
					input.controller.setup(item, this.handler.name, props);
					if (typeof input.dataset.inline !== "undefined") wrapper.classList.add('inline')
				});
			});
	}

	error(field, message) {
		let input = this.$('div.input[data-name="' + field + '"]').node;
		if (input) input.dataset.error = '▼ ' + message;
	}

	clearErrors() {
		this.$('div.input').each(input => input.removeAttribute("data-error"));
	}

	get data() {
		let data = {};
		this.$$('input').each(item => data[item.controller.name] = item.controller.value);
		return data;
	}
}