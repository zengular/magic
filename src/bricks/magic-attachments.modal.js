import {DragAndDrop, modalify} from "zengular-ui";
import {Brick}                 from "zengular";
import twig                    from "./magic-attachments.twig";
import copy                    from "copy-text-to-clipboard";
import "./magic-attachments.scss";

import {getClassNameForExtension} from "font-awesome-filetypes";
import Contextmenu                from "zengular-ui/contextmenu/contextmenu";
import MagicImageEditorModal      from "./magic-image-editor.modal";


@modalify()
@Brick.register('magic-attachments', twig)
@Brick.renderOnConstruct(false)
export default class MagicAttachmentsModal extends Brick {

	beforeRender(args) {
		if (args) {
			this.handler = args.handler;
			this.id = args.id;
			this.api = args.api ? args.api : this.handler.api + '/attachment'
		}
	}

	onInitialize() {
		this.menu = new Contextmenu();
		this.menu.add('Download', 'fas fa-cloud-download-alt').click(ctx => {
			this.openAttachment(ctx.dataset.url);
		});
		this.menu.add('Rename', 'fas fa-edit').click(ctx => {
			let category = ctx.dataset.category;
			let filename = ctx.dataset.filename;
			this.renameAttachment(filename, category);
		});
		this.menu.add('Delete', 'fal fa-trash-alt').click(ctx => {
			let category = ctx.dataset.category;
			let filename = ctx.dataset.filename;
			this.deleteAttachment(filename, category);
		});
		this.menu.add('Copy name', 'fal fa-copy').click(ctx => {
			let filename = ctx.dataset.filename;
			copy(filename);
		});
		this.menu.add('Copy path', 'far fa-copy').click(ctx => {
			let category = ctx.dataset.category;
			let filename = ctx.dataset.filename;
			copy(category + '/' + filename);
		});
		this.menu.add('Copy url', 'fas fa-copy').click(ctx => {
			let url = ctx.dataset.url;
			copy(url);
		});
		this.menu.add('Edit image', 'fas fa-image', 'image-edit').click(ctx => {
			let category = ctx.dataset.category;
			let filename = ctx.dataset.filename;
			let url = ctx.dataset.url;
			this.imageEdit(url, category, filename);
		});

	}

	createViewModel() {
		const formData = new FormData();
		formData.append('id', this.id);
		return fetch(this.api + '/get', {method: 'POST', body: formData})
			.then(res => res.json())
			.then(attachments => Object({
				attachments,
				getClassNameForExtension: getClassNameForExtension,
				handler:this.handler
			}))
	}

	onRender() {

		this.$$('close').listen('click', () => {this.close()});

		this.$$('attachment')
			.listen('contextmenu', (event, target) => {
				event.preventDefault();
				if (target.dataset.type === 'image') {
					this.menu.enable('image-edit')
				} else {
					this.menu.disable('image-edit')
				}
				this.menu.show(event, target);
			})
			.listen('dragstart', (event, target) => {
				event.dataTransfer.setData('filename', target.dataset.filename);
				event.dataTransfer.setData('category', target.dataset.category);
				event.dataTransfer.setData('source:' + target.dataset.category, '');
				event.dataTransfer.setData('filename:' + target.dataset.filename, '');
				event.dataTransfer.setData('action', "copy");
			})
			.listen('dblclick', (event, target) => {
				if (target.dataset.url && event.target.tagName !== 'INPUT') {
					this.openAttachment(target.dataset.url)
				}
			});

		this.$$('trash')
			.listen('dragover', even => event.preventDefault())
			.listen('dragenter', (event, target) => {
				target.classList.remove('fal');
				target.classList.add('fas');
				event.preventDefault();
			})
			.listen('dragleave', (event, target) => {
				target.classList.remove('fas');
				target.classList.add('fal');
				event.preventDefault();
			})
			.listen('drop', (event, target) => {
				if (event.dataTransfer.getData('action') === 'copy') {
					this.deleteAttachment(event.dataTransfer.getData('filename'), event.dataTransfer.getData('category'));
				}
			});

		this.$$('attachment', node => node.overCounter = 0)
			.listen('dragover', (event) => event.preventDefault())
			.listen('dragenter', (event, target) => {
				target.overCounter++;
				if (event.dataTransfer.types.indexOf('source:' + target.dataset.category) !== -1 &&
					event.dataTransfer.types.indexOf('filename:' + target.dataset.filename) === -1
				) {
					target.classList.add('dragover');
				}
				event.preventDefault();
			})
			.listen('dragleave', (event, target) => {
				target.overCounter--;
				if (target.overCounter === 0) target.classList.remove('dragover');
				event.preventDefault();
			})
			.listen('drop', (event, target) => {
				if (event.dataTransfer.types.indexOf('source:' + target.dataset.category) !== -1 &&
					event.dataTransfer.types.indexOf('filename:' + target.dataset.filename) === -1) {
					event.preventDefault();
					event.stopImmediatePropagation();
					target.classList.remove('dragover');
					target.overCounter = 0;

					let filename = event.dataTransfer.getData('filename');
					let fileSource = event.dataTransfer.getData('category');

					this.reorderAttachment(filename, fileSource, target.dataset.ordinal);
				}
			});


		this.$$("category", node => node.overCounter = 0)
			.listen('dragover', (event) => event.preventDefault())
			.listen('dragenter', (event, target) => {
				target.overCounter++;
				if (event.dataTransfer.types.indexOf('source:' + target.dataset.category) === -1) {
					target.classList.add('dragover');
				}
				event.preventDefault();
			})
			.listen('dragleave', (event, target) => {
				target.overCounter--;
				if (target.overCounter === 0) target.classList.remove('dragover');
				event.preventDefault();
			})
			.listen('drop', (event, target) => {
				event.preventDefault();
				event.stopImmediatePropagation();
				target.classList.remove('dragover');
				target.overCounter = 0;
				if (event.dataTransfer.getData('action') === 'copy') {
					let method = event.shiftKey ? 'copy' : 'move';
					let fileTarget = target.dataset.category;
					let filename = event.dataTransfer.getData('filename');
					let fileSource = event.dataTransfer.getData('category');
					if (fileTarget !== fileSource) this.copyAttachment(method, filename, fileSource, fileTarget);
				} else {
					let files = event.dataTransfer.files;
					let category = target.dataset.category;
					this.uploadAttachment(files, category);
				}
			});
	}


	openAttachment(url) {
		let win = window.open(url, '_blank');
		win.focus();
	}

	uploadAttachment(files, collection) {
		let uploads = [];
		for (let i = 0; i < files.length; i++) {
			let file = files[i];
			const formData = new FormData();
			formData.append('id', this.id);
			formData.append('collection', collection);
			formData.append('file', file)
			let upload = fetch(this.api + '/upload', {
				method: 'POST',
				body: formData,
			})
			uploads.push(upload);
		}
		Promise.all(uploads).finally(() => this.render())
	}

	copyAttachment(method, filename, source, target) {
		let formData = new FormData();
		formData.append('id', this.id);
		formData.append('filename', filename);
		formData.append('source', source);
		formData.append('target', target);
		fetch(this.api + '/' + method, {method: 'POST', body: formData})
			.finally(() => this.render());
	}

	deleteAttachment(filename, collection) {
		let formData = new FormData();
		formData.append('id', this.id);
		formData.append('filename', filename);
		formData.append('collection', collection)
		fetch(this.api + '/delete', {method: 'POST', body: formData})
			.finally(() => this.render());
	}

	crop(collection, filename, data) {
		let formData = new FormData();
		formData.append('id', this.id);
		formData.append('filename', filename);
		formData.append('collection', collection)
		formData.append('data', JSON.stringify(data))
		fetch(this.api + '/crop', {method: 'POST', body: formData})
			.finally(() => this.render());
	}

	renameAttachment(filename, collection) {
		let newname = prompt('', filename);
		if (newname.trim() !== '' && newname !== filename) {
			let formData = new FormData();
			formData.append('collection', collection);
			formData.append('filename', filename);
			formData.append('newname', newname);
			formData.append('id', this.id);
			fetch(this.api + '/rename', {method: 'POST', body: formData})
				.finally(() => this.render());
		}
	}

	reorderAttachment(filename, collection, ordinal) {
		let formData = new FormData();
		formData.append('collection', collection);
		formData.append('filename', filename);
		formData.append('ordinal', ordinal);
		formData.append('id', this.id);
		fetch(this.api + '/reorder', {method: 'POST', body: formData})
			.finally(() => this.render());
	}

	imageEdit(url, category, filename) {
		MagicImageEditorModal.modalify({
			url: url
		}, (data) => {
			if (data !== false) this.crop(category, filename, data);
		});
	}

}
