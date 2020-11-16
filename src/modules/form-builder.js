import MagicInputCheckboxBrick   from "../bricks/form-input/magic-input-checkbox.brick";
import MagicInputCheckboxesBrick from "../bricks/form-input/magic-input-checkboxes.brick";
import MagicInputCodeBrick       from "../bricks/form-input/magic-input-code.brick";
import MagicInputDateBrick       from "../bricks/form-input/magic-input-date.brick";
import MagicInputDatetimeBrick   from "../bricks/form-input/magic-input-datetime.brick";
import MagicInputFloatBrick      from "../bricks/form-input/magic-input-float.brick";
import MagicInputIntegerBrick    from "../bricks/form-input/magic-input-integer.brick";
import MagicInputSelectBrick     from "../bricks/form-input/magic-input-select.brick";
import MagicInputStringBrick     from "../bricks/form-input/magic-input-string.brick";
import MagicInputTimeBrick       from "../bricks/form-input/magic-input-time.brick";
import BrickFinder               from "zengular/src/brick-finder";


/**
 * @property {Array<Section>} sections
 */
export default class FormBuilder {

	constructor() {
		this.sections = [];
		this.validators = {};
	}

	add(label = null, finder = null) {
		let section = new Section(label, finder, this);
		this.sections.push(section);
		return section;
	}

}

/**
 * @property {FormBuilder} form
 * @property {string} label
 * @property {BrickFinder} finder
 * @property {Array<Input>} inputs
 */
class Section {
	constructor(label, finder, form) {
		this.label = label;
		this.form = form;
		this.finder = finder;
		this.inputs = [];
	}

	/**
	 *
	 * @param field
	 * @param input
	 * @param attributes
	 * @returns {Input}
	 */
	add(field, input = null, attributes = {}) {
		input = new Input(field, input, attributes, this);
		this.inputs.push(input);
		return input;
	}

}

class Input {
	constructor(field, input, attributes, section) {
		this.name = typeof field === "object" ? field.name : field;
		this.input = input === null ? this.deriveInput(field.type) : input;
		this.section = section;
		this.hint = null;
		this.attributes = attributes;
		if (typeof field === 'object' && typeof this.attributes.options === "undefined") this.attributes['options'] = field.options;
		this.inline = false;
	}

	deriveInput(type) {
		switch (type) {
			case 'BOOL':
				return MagicInputCheckboxBrick;
			case 'STRING':
				return MagicInputStringBrick;
			case 'INT':
				return MagicInputIntegerBrick;
			case 'ID':
				return MagicInputIntegerBrick;
			case 'FLOAT':
				return MagicInputFloatBrick;
			case 'DATE':
				return MagicInputDateBrick;
			case 'DATETIME':
				return MagicInputDatetimeBrick;
			case 'ENUM':
				return MagicInputSelectBrick;
			case 'SET':
				return MagicInputCheckboxesBrick;
			case 'JSON':
				return MagicInputCodeBrick;
			case 'TIME':
				return MagicInputTimeBrick;
			case 'GUID':
				return MagicInputStringBrick;
		}
	}

	setInline() {
		this.inline = true;
		return this;
	}
	addValidator(validator) {
		if (!Array.isArray(this.section.form.validators[this.name])) this.section.form.validators[this.name] = []
		this.section.form.validators[this.name].push(validator);
		return this;
	}
	setHint(hint) {
		this.hint = hint;
		return this;
	}
	setAttribute(key, value) {
		this.attributes[key] = value;
		return this;
	}
}
