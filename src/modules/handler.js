import Brick   from "zengular/src/brick";
import {magic} from "zengular-magic";


/**
 * @property {string} api
 * @property {string} name
 * @property {string} label
 * @property {{large:string, small: string}} icon
 * @property {{button: Array, title: string, brick: Brick, setup: function, label: string}} form
 * @property {{title: string, button: Array, limit: number, search: Brick|null, card: {brick: Brick, size: string, setup: function} sort: {fields: Array, default: {field: string, order: string}}}} list
 */

export default class Handler {
	/**
	 *
	 * @param {string} name
	 * @param {string} api
	 */
	constructor(name, api) {
		this.api = api;
		this.name = name;

		this.list = {};
		this.form = {
			button: [],
			brick: null,
			label: 'id',
			setup: null
		};
		this.list = {
			button: [],
			limit: 50,
			search: null,
			card: {
				brick: null,
				size: 'large',
				setup: null
			},
			sort: {
				fields: [],
				default: {
					field: 'id',
					order: 'asc'
				}
			}
		}

		this.fetch = {
			list: (page, sort, quickSearch, search) => fetch(this.api + '/list/' + page, {
					method: 'POST',
					body: JSON.stringify({sort, quickSearch, search, limit: this.list.limit})
				}
			),
			get: (id) => fetch(this.api + '/get' + (id ? ('/' + id) : '')),
			save: (id, item) => fetch(this.api + '/save' + (id ? ('/' + id) : ''), {
				method: 'POST',
				body: JSON.stringify(item)
			}),
			delete: (id) => fetch(this.api + '/delete/' + id, {method: "DELETE"})
		};

	}


	translate(key, def = null) {
		if(!Array.isArray(key)) key = [key];
		key.unshift(this.name);
		key.unshift('handler');
		return magic.i18n.get(key, def);
	}

	set dictionary(data){
		let dictionary = {handler:{}}
		dictionary['handler'][this.name] = data;
		magic.i18n.append(dictionary)
	}

}