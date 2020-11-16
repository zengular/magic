import {Brick}    from "zengular";
import twig       from "./magic-input-selector.twig";
import "./magic-input-selector.scss";
import MagicInput from "./magic-input";


@Brick.register('magic-input-selector', twig)
export default class MagicInputSelectorBrick extends MagicInput {

	constructor(root) {
		super(root);
		this.attributes = {
			multi: false,
			minchar: 3
		};
	}

	static setAttributes(api, multi = false, minchar = 3) {
		return {api, multi, minchar};
	}

	get value() {
		let value;
		let items = Array.from(this.$$('items').node.children);
		if (this.attributes.multi) {
			value = [];
			items.forEach(child => value.push(child.dataset.key))
		} else {
			value = items.length === 0 ? null : items[0].dataset.key;
		}
		return value;
	}

	set value(value) { this.add(value);}

	@Brick.listen('search-add')
	__add(event) {
		let key = event.data.key;

		if (this.$$('items').filter(' [data-key="' + key + '"]').node !== null) return;

		if (!this.attributes.multi) {
			this.$$('items').node.innerHTML = '';
			this.add(key);
		} else if (this.$$('items').node.children.length < this.attributes.multi) this.add(key);

		event.cancel();
	}

	add(key) {
		if(!Array.isArray(key) && typeof key === "object") key = Object.values(key);
		if(Array.isArray(key)) key = key.join(',');
		let api = this.dataset.api ? this.dataset.api : this.props.api;
		fetch(api + '/' + key)
			.then(res => res.json())
			.then(items => {
				items.forEach(item => {
					let div = document.createElement('div');
					div.dataset.key = item.key;
					div.innerHTML = item.value;
					this.$$('items').node.appendChild(div);
					div.addEventListener('click', event => {
						div.remove();
					})
				})
			});
	}
}
