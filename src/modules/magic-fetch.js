export default class MagicFetch {
	constructor() {
//		this.api = api;
//		this.query = query === null ? '' : '?' + query;
	}

	get api(){return '';}
	get query(){return '';}

	list(page, sort, quickSearch, search, limit) {
		return fetch(this.api + '/list/' + page + this.query, {
			method: 'POST',
			body: JSON.stringify({sort, quickSearch, search, limit})
		});
	}
	get(id) {return fetch(this.api + '/get/' + id + this.query);}
	blank() {return fetch(this.api + '/get' + this.query);}
	create(data) {return fetch(this.api + '/save' + this.query, {method: 'POST', body: JSON.stringify(data)})}
	save(id, data) {
		return fetch(this.api + '/save/' + id + this.query, {
			method: 'POST',
			body: JSON.stringify(data)
		});
	}
	delete(id) { return fetch(this.api + '/delete/' + id + this.query, {method: "DELETE"});}
	attachment(action, data) { return fetch(this.api + '/attachment/' + action, {method: 'POST', body: data});}
}