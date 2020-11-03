import Handler from "./handler";
import {I18n} from "zengular-util"

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
		this.i18n = new I18n({});
	}

	/**
	 * @param name
	 * @returns {Handler}
	 */
	getHandler(name) { return this.handlers[name];}

	/**
	 * @param {Handler} handler
	 */
	addHandler(handler) { this.handlers[handler.name] = handler;}

	init(i18n = {}, authApi) {
		this.i18n.append(i18n);
		return fetch(authApi)
			.then(res => res.json())
			.then(user => this.user = user);
	}
}

let magic = new Magic();
export default magic;