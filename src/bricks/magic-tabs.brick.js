import {Brick}       from "zengular";
import twig          from "./magic-tabs.twig";
import "./magic-tabs.scss";
import MagicTabBrick from "./magic-tab.brick";
import TabData       from "../modules/tab-data";


@Brick.register('magic-tabs', twig)
export default class MagicTabsBrick extends Brick {

	/**
	 * @param {TabData} tabData
	 * @returns {*}
	 */
	open(tabData) {
		let tab = this.$$('tab').filter('[data-tab-id=' + tabData.id + ']').brick;
		if (tab) return this.go(tab);
		MagicTabBrick.create('div', true)
			.then(tab => {
				tab.actor('tab');
				this.root.append(tab.root);
				return tab.setup(tabData).then(() => tab);
			})
			.then((tab) => {
				tab.root.addEventListener('click', () => this.go(tab));
				this.go(tab);
			});
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