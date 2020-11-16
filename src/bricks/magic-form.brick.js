import {Brick} from "zengular";
import "./magic-form.scss";
import magic                    from "../modules/magic";
import {Guard, LengthValidator} from "zengular-util";


export default class MagicFormBrick extends Brick {
	onInitialize() {
		this.item = {};
		this.root.classList.add('magic-form');
		this.handler = magic.getHandler(this.dataset.handler);
		this.validators = {};
	}

	createViewModel() {
		return {
			item: this.item,
			dataset: this.dataset,
			handler: this.handler
		}
	}

	setup(item, attributes) {
		this.item = item;
		this.render()
			.then(() => {
				let formBuilder = this.formBuilder;
				if (typeof formBuilder === "object") return this.buildForm(formBuilder);
			})
			.then(() => {
				this.$$('input').each(input => {
					let wrapper = document.createElement('div');
					let label = document.createElement('label');
					label.innerHTML = this.handler.translate(['input', input.dataset.name]);
					wrapper.classList.add('input');
					wrapper.dataset.name = input.dataset.name;
					wrapper.appendChild(label);
					input.parentElement.insertBefore(wrapper, input);
					wrapper.appendChild(input);
					input.controller.setup(item, this.handler.name, attributes);
					if (typeof input.dataset.inline !== "undefined") wrapper.classList.add('inline')
				});
			})
			.then(() => {
				this.$$('input').each(input => {
					let hint = this.$('.hint[data-for="' + input.dataset.name + '"]').node;
					if (hint !== null) {
						let label = input.previousSibling;
						label.classList.add('hinted');
						label.addEventListener('click', event => hint.classList.toggle('visible'));
						input.after(hint);
					}
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

		let validators = (Object.keys(this.validators));
		if(validators.length){
			let guard = new Guard();
			validators.forEach(name=>{
				let g = guard.create(name);
				this.validators[name].forEach(validator=>g.add(validator));
			});
			return guard.test(data);
		}
		return data;
	}

	/**
	 * @param {FormBuilder} formBuilder
	 */
	buildForm(formBuilder) {
		let promises = [];
		this.validators = Object.assign(this.validators, formBuilder.validators);
		formBuilder.sections.forEach(section => {
			let sectionElement;
			if (section.finder === null) {
				sectionElement = document.createElement('section');
				this.root.appendChild(sectionElement);
			} else {
				sectionElement = section.finder.node;
			}
			if (section.label) {
				let label = document.createElement('label');
				label.innerHTML = section.label;
				sectionElement.appendChild(label);
			}
			section.inputs.forEach(input => {
				let attributes = input.attributes;
				attributes.name = input.name;
				if(input.inline) attributes.inline = true;
				if(input.hint){
					let hint = document.createElement('div');
					hint.classList.add('hint');
					hint.dataset.for = input.name;
					hint.innerHTML = input.hint;
					this.root.appendChild(hint);
				}
				promises.push(
					input.input.create('div', true, attributes)
						.then(inputBrick =>{
							inputBrick.setAttributes(attributes);
							return Object.create({inputBrick: inputBrick, input: input, sectionElement: sectionElement})
						})
				);
			});
		});
		return Promise.all(promises)
			.then(inputs => {
				inputs.forEach(({inputBrick, input, sectionElement}) => {
					sectionElement.appendChild(inputBrick.root)
				})
			})
	}
}