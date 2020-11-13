import {Brick}                 from "zengular";
import magic                   from "../../modules/magic";
import {MagicFormWrapperBrick} from "zengular-magic";
import twig from "./magic-button.twig"
import "./magic-button.scss"
/**
 * @property {MagicFormWrapperBrick} form
 */
@Brick.register('magic-button',twig)
export default class MagicButton extends Brick {


	get handler(){return this.form.handler;}
	get id(){return this.form.id;}
	get visible(){ return true; }
	get icon(){ return "fal fa-rocket";}
	get title(){ return "Magic";}

	click(){console.log('you should do something!');}

	createViewModel() { return {icon: this.icon, title: this.title, visible: this.visible}}
	onRender() {
		this.$$('button').on.mouse.click(() => this.click());
	}
}
