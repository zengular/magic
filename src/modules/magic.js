import application from "../app";
import dateFormat  from "dateformat";
import Handler     from "./handler";
import I18n        from "./i18n";


/**
 * @property {I18n} i18n
 */
class Magic {

	event = {
		menuHandlerSelected: 'menuHandlerSelected',
		addNewItem: 'add-new-item',
		selectItem: 'select-item',
		search: 'search',
		unauthorized: 'unauthorized',
		activateForm: 'activate-form',
		itemChanged: 'item-changed',
		save: 'save'
	}

	constructor() {
		this.handlers = {};
		this.user = null;
	}

	/**
	 * @param name
	 * @returns {Handler}
	 */
	getHandler(name) { return this.handlers[name];}

	/**
	 * @param {Handler} handler
	 */
	setHandler(handler) { this.handlers[handler.name] = handler;}

	init(i18n = {}) {
		this.i18n = new I18n(i18n);
		return fetch('/api/magic/auth')
			.then(res => res.json())
			.then(user => this.user = user);
	}
}

let magic = new Magic();
export default magic;