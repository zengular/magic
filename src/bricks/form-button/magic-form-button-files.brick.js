import MagicButton           from "../magic-button/magic-button";
import MagicAttachmentsModal from "../magic-attachments.modal";


export default class MagicFormButtonFilesBrick extends MagicButton {
	get icon(){ return "fal fa-folder";}
	get title(){ return "files";}
	get visible(){ return this.id;}
	click() {
		MagicAttachmentsModal.modalify({handler: this.form.handler, id: this.form.id, api: this.dataset.api, collections: this.collections})
	}

}
