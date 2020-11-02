import {Brick} from "zengular";
import magic   from "../../modules/magic";


export default class MagicFormButton extends Brick {

	onInitialize() {
		this.handler = magic.getHandler(this.dataset.handler);
		this.id = this.dataset.id;
	}

	createViewModel() { return {id: this.id}}

	onRender() { this.$$('button').on.mouse.click(() => this.click());}

}
