import {Brick} from "zengular";
import twig    from "./magic-input-helper-search.twig";
import "./magic-input-helper-search.scss";


@Brick.register('magic-input-helper-search', twig)
export default class MagicInputHelperSearchBrick extends Brick {

	onInitialize() {
		this.api = this.dataset.api;
	}


	onRender() {
		this.$$('search').on.input((event, target) => {
			if (target.value.length >= this.dataset.minchar) this.search(target.value);
		}, 300)
	}

	search(keyword) {
		fetch(this.api + '/search/' + keyword)
			.then(res => res.json())
			.then(items => {
				this.$$('result').node.innerHTML = '';
				items.forEach(item => {
					let div = document.createElement('div');
					div.innerHTML = item.value;
					div.dataset.key = item.key;
					div.addEventListener('click', event => this.fire('search-add', {key: item.key}))
					this.$$('result').node.appendChild(div);
				})
			})
	}
}
