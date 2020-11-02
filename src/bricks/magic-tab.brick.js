import {Brick}        from "zengular";
import twig           from "./magic-tab.twig";
import "./magic-tab.scss";
import magic                 from "../modules/magic";
import MagicFormWrapperBrick from "./magic-form-wrapper.brick";


@Brick.register('magic-tab', twig)
export default class MagicTabBrick extends Brick {

	onInitialize() {
		this.handler = magic.getHandler(this.dataset.handler);
		this.id = this.dataset.id;
		this.view = {
			icon: this.handler.icon.small,
			id: this.id,
			label: this.handler.form.title
		};

		return MagicFormWrapperBrick.create('div', true, {handler: this.handler.name})
			.then((form) => {
				this.form = form;
				form.tab = this;
			})
			.then(() => this.form.load(this.id))
			.then(() => this.activateForm())
	}

	createViewModel() {
		return {
			tab: this.view,
			handler: this.handler
		};
	}

	activateForm() { this.fire(magic.event.activateForm, {form: this.form})}

	onRender() {
		this.dataset.id = this.view.id;
		this.$$('remove').on.mouse.click((event) => {
			this.remove();
			event.stopImmediatePropagation()
		});
	}

	remove(){
		if (this.root.nextSibling !== null) this.fire('change-tab', {tab: this.root.nextSibling.controller});
		else if (this.root.previousSibling !== null) this.fire('change-tab', {tab: this.root.previousSibling.controller});
		this.form.root.remove();
		this.root.remove();
	}
}