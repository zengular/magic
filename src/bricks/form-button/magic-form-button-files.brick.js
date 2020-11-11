import {Brick}              from "zengular";
import MagicFormButton     from "./magic-form-button";
import MagicAttachmentsModal from "../magic-attachments.modal";

export default class MagicFormButtonFilesBrick extends MagicFormButton {
	get icon(){ return "fal fa-folder";}
	get title(){ return "files";}
	get visible(){ return true;}
	click() {
		MagicAttachmentsModal.modalify({handler: this.form.handler, id: this.form.id, api: this.dataset.api, collections: this.collections})
	}

}
