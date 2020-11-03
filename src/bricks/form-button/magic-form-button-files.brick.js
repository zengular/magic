import {Brick}              from "zengular";
import twig                 from "./magic-form-button-files.twig";
import "./magic-form-button-files.scss";
import MagicFormButton     from "./magic-form-button";
import MagicAttachmentsModal from "../magic-attachments.modal";

@Brick.register('magic-form-button-files', twig)
export default class MagicFormButtonFilesBrick extends MagicFormButton {
	createViewModel() { return {id: this.dataset.id}}

	click() {
		MagicAttachmentsModal.modalify({handler: this.form.handler, id: this.form.id, api: this.dataset.api})
	}

}
