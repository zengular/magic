import Brick from "zengular/src/brick";


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
	 * @param {string} label
	 * @param {{large:string, small:string}}icon
	 */
	constructor(name, api, label, icon) {
		this.list = {};
		this.icon = {};
		this.form = {
			title: label,
			button: [],
			brick: null,
			label: 'id',
			setup: null
		};
		this.list = {
			title: label,
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

		this.api = api;

		this.name = name;
		this.label = label;
		if (typeof icon === "string") {
			this.icon = {
				small: icon,
				large: icon
			};
		} else {
			this.icon = icon;
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

}