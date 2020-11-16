import {Brick}               from "zengular";
import twig                  from "./magic-tab.twig";
import "./magic-tab.scss";
import magic                 from "../modules/magic";
import MagicFormWrapperBrick from "./magic-form-wrapper.brick";
import TabData               from "../modules/tab-data";


/**
 * @property {TabData} data
 */
@Brick.register('magic-tab', twig)
export default class MagicTabBrick extends Brick {

	set id(id) { this.root.dataset.tabId = id;}
	set icon(icon) { this.$$('icon').node.className = icon;}
	set title(title) { this.$$('title').node.innerHTML = title;}
	set label(label) { this.$$('label').node.innerHTML = label;}

	activateForm() { this.fire(magic.event.activateForm, {form: this.form})}

	setup(data) {
		return data.form.create('div', false)
			.then((form) => this.form = form)
			.then(() => this.dataset.tabId = data.id)
			.then(() => this.form.tab = this)
			.then(() => this.form.setup(data.data))
			.then(() => this.activateForm())
	}

	onRender() {
		this.$$('remove').on.mouse.click((event) => {
			this.remove();
			event.stopImmediatePropagation()
		});
	}

	remove() {
		if (this.root.classList.contains('selected')) {
			if (this.root.nextSibling !== null) this.fire('change-tab', {tab: this.root.nextSibling.controller});
			else if (this.root.previousSibling !== null) this.fire('change-tab', {tab: this.root.previousSibling.controller});
		}
		this.form.root.remove();
		this.root.remove();
	}
}