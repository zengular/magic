import {Brick}    from "zengular";
import twig       from "./magic-input-selector.twig";
import "./magic-input-selector.scss";
import MagicInput from "./magic-input";


@Brick.register('magic-input-selector', twig)
export default class MagicInputSelectorBrick extends MagicInput {

	onInitialize() {
		this.minchar = this.dataset.minchar ?? 3;
		this.multi = typeof this.dataset.multi !== 'undefined';
		if (this.multi) {
			this.multi = this.dataset.multi === '' ? Infinity : parseInt(this.dataset.multi);
		}
	}

	createViewModel() {
		let viewModel = super.createViewModel();
		viewModel.minchar = this.minchar;
		return viewModel;
	}

	get value() {
		let value;
		let items = this.$$('items').node.children;
		if (this.multi) {
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

		if (!this.multi) {
			this.$$('items').node.innerHTML = '';
			this.add(key);
		} else if (this.$$('items').node.children.length < this.multi) this.add(key);

		event.cancel();
	}

	add(key) {
		if(Array.isArray(key)) key = key.join(',');
		fetch(this.props.api + '/' + key)
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
