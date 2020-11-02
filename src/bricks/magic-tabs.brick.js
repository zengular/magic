import {Brick}       from "zengular";
import twig          from "./magic-tabs.twig";
import "./magic-tabs.scss";
import MagicTabBrick from "./magic-tab.brick";


@Brick.register('magic-tabs', twig)
export default class MagicTabsBrick extends Brick {

	onInitialize() { this.view = {};}
	createViewModel() { return this.view;}


	open(handler, id) {
		let tab = this.$$('tab').filter('[data-handler=' + handler + '][data-id="' + id + '"]').brick;
		if (tab) return this.go(tab);

		MagicTabBrick.create('div', true, {handler, id})
			.then(tab => {
				tab.actor('tab');
				this.root.append(tab.root);
				tab.root.addEventListener('click', () => this.go(tab));
				this.go(tab);
			})
	}

	@Brick.listen('change-tab')
	__changeTab(event) { this.go(event.data.tab);}

	go(tab) {
		if (tab.root.classList.contains('selected')) return;
		this.$$('tab').filter('.selected').each(node => node.classList.remove('selected'));
		tab.root.classList.add('selected');
		tab.activateForm();
	}

}