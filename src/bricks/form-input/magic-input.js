import {Brick} from "zengular";
import magic   from "../../modules/magic";


export default class MagicInput extends Brick {

	constructor(root) {
		super(root);
		this.actor('input');
		this.name = this.dataset.name;
	}

	set value(value) { this.$$('input').node.value = value;}
	get value() {return this.$$('input').node.value;}

	createViewModel() {
		return {
			props: this.props,
			name: this.name,
			handler: this.handler
		};
	}

	setup(item, handler, props) {
		this.props = props[this.name];
		this.handler = magic.getHandler(handler);
		this.render()
			.then(() => this.value = item[this.name])
	}

}
