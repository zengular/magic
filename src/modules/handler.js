import Brick                          from "zengular/src/brick";
import {magic, MagicFormWrapperBrick} from "zengular-magic";
import TabData                        from "./tab-data";
import MagicFetch                     from "./magic-fetch";


/**
 * @property {string} name
 * @property {MagicFetch} fetch
 * @property {Brick} form
 * @property {{buttons: Array, limit: number, search: Brick|null, card: Brick, sort: {fields: Array, default: {field: string, order: string}}}} list
 */

export default class Handler {
	/**
	 *
	 * @param {string} name
	 * @param {string} api
	 */
	constructor(name) {
		this.name = name;
		this.fetcher = null;
		this.form = null;
		this.list = null
	}
	/**
	 * @returns {*}
	 */
	get fetch(){
		if(typeof this._fetch === "undefined") this._fetch = new this.fetcher();
		return this._fetch;
	}

	selectItemEventData(id = null) {
		return new TabData({
			handler: this.name,
			id: id
		}, this.form, 'handler-' + this.name + '-' + (id === null ? 'new' : id))
	}

	translate(key, def = null) {
		if (!Array.isArray(key)) key = [key];
		key.unshift(this.name);
		key.unshift('handler');
		return magic.i18n.get(key, def);
	}

	set dictionary(data) {
		let dictionary = {handler: {}}
		dictionary['handler'][this.name] = data;
		magic.i18n.append(dictionary)
	}

}