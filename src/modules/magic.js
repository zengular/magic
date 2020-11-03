import Handler from "./handler";
import {I18n}  from "zengular-util"
import User    from "./user";

/**
 * @property {I18n} i18n
 * @property {User} user
 * @property {string} authApi
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

	init(authApi) {
		this.authApi = authApi;
		return fetch(authApi)
			.then(res=> {
				if(res.status === 200) return res.json();
				else throw 'unauthorized';
			})
			.then(user => this.user = new User(user.id, user.name, user.avatar, user.roles))
			.catch(()=>{})
	}
}

let magic = new Magic();
export default magic;