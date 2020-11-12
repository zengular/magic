import {Brick}  from "zengular";
import twig     from "./magic-list.twig";
import "./magic-list.scss";
import magic    from "../modules/magic";
import registry from "zengular/src/brick-registry";


@Brick.register('magic-list', twig)
export default class MagicListBrick extends Brick {

	onInitialize() {
		this.pageCount = 0;
		this.handler = magic.getHandler(this.dataset.handler);
		this.searchParams = [];
		this.actor('list');
		this.currentpage = 1;
	}

	createViewModel() {
		let buttons = this.handler.list.button.map(button => {
			if (typeof button === 'function') {
				return {
					tag: button.tag,
					data: {},
					render: true
				}
			}
			return {
				tag: button.button.tag,
				data: button.data,
				render: button.role ? magic.user.hasRole(button.role) : true
			}
		});
		return {
			buttons,
			handler: this.handler,
			search: this.handler.list.search !== null ? this.handler.list.search.tag : null
		}
	}

	onRender() {
		this.$$('quick-search').on.input(() => this.loadList(), 300);
		this.$$('open-search').on.click(() => this.$$('search').node.classList.toggle('visible'));
		this.$$('page').on.input((event, target) => {
			let page = parseInt(target.value);
			if (page < 1 || isNaN(page)) page = 1;
			target.value = page;
			this.loadList(page);
		}, 300);
		this.$$('sort').on.input(() => {this.loadList(1)});
		this.$$('prev').on.click(() => {
			let page = parseInt(this.$$('page').node.value);
			page--;
			if (page < 1 || isNaN(page)) page = 1;
			this.$$('page').node.value = page;
			this.loadList(page);
		});
		this.$$('next').on.click(() => {
			let page = parseInt(this.$$('page').node.value);
			page++;
			if (page < 1 || isNaN(page)) page = 1;
			this.$$('page').node.value = page;
			this.loadList(page);
		});
		this.handler.list.buttons.forEach(button=>{
			button.create('div', false)
				.then(button=>{
					button.list = this;
					this.$$('nav').node.appendChild(button.root);
					return button.render();
				})
		})


		this.loadList(1);
	}

	@Brick.listen(magic.event.search)
	__search(event) {
		this.searchParams = event ? event.data.params : '';
		this.loadList(1);
	}

	@Brick.listen(magic.event.addNewItem)
	__addNewItem(event) { event.data = this.handler.selectItemEventData();}

	@Brick.listen(magic.event.selectItem)
	__selectItem(event) {
		event.data = this.handler.selectItemEventData(event.data.id);
	}

	loadData(page) {
		let sort = this.$$('sort').node.value;
		let quickSearch = this.$$('quick-search').node.value;
		let search = this.searchParams.length ? this.searchParams : null;
		return this.handler.fetch.list(page, sort, quickSearch, search)
			.then(res => res.json());
	}

	loadList(page = null) {
		if (page === null) page = this.currentpage;
		this.currentpage = page;
		let cardBrick = this.handler.list.card;

		this.loadData(page)
			.then(data => {
				this.$$('count').node.innerHTML = data.count;
				this.pageCount = Math.ceil(data.count / this.handler.list.limit);
				this.$$('page-count').node.innerHTML = this.pageCount;
				this.$$('page').node.value = data.page;
				this.$$('list').node.innerHTML = '';

				data.items.forEach(item => {
					cardBrick.create('div', false)
						.then(card => {
							card.dataset.handler = this.handler.name;
							card.list = this;
							card.render({id: item.id, item: item.data})
							this.$$('list').node.appendChild(card.root);
						});
				});
			})
	}

}