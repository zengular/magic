import {Brick} from "zengular";
import magic from "../../modules/magic";
import {MagicFormWrapperBrick} from "zengular-magic";
import twig from "./magic-form-button.twig"


/**
 * @property {MagicFormWrapperBrick} form
 */
@Brick.register('magic-form-button', twig)
export default class MagicFormButton extends Brick {


	get handler() {return this.form.handler;}
	get id() {return this.form.id;}
	get visible() { return true; }
	get icon() { return "fal fa-rocket";}
	get title() { return "Magic";}

	click() {console.log('you should do something!');}

	createViewModel() {
		console.log({icon: this.icon, title: this.title, visible: this.visible});
		return {icon: this.icon, title: this.title, visible: this.visible}
	}
	onRender() {this.$$('button').on.mouse.click(() => this.click());}
}
