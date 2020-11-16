import {Brick} from "zengular";
import magic   from "../../modules/magic";


export default class MagicInput extends Brick {

	constructor(root) {
		super(root);
		this.actor('input');
		this.name = this.dataset.name;
	}

	onInitialize() { this.attributes = this.readDataset();}

	readDataset() { return Object.assign({}, this.dataset); }

	setAttributes(attributes) { this.attributes = Object.assign(this.attributes, attributes); }

	set value(value) { if (typeof value !== "undefined") this.$$('input').node.value = value;}
	get value() {return this.$$('input').node.value;}

	createViewModel() {
		return {
			attributes: this.attributes,
			name: this.name,
			handler: this.handler
		};
	}

	setup(item, handler, attributes) {
		this.attributes = Object.assign(this.attributes, attributes[this.name]);
		this.handler = magic.getHandler(handler);
		this.render().then(() => this.value = item[this.name])
	}

}
