import {Brick}                 from "zengular";
import twig                    from "./magic-login.twig";
import "./magic-login.scss";
import magic from "../modules/magic";
import {ZengularNotification}  from "zengular-ui";


@Brick.register('magic-login', twig)
export default class MagicLoginBrick extends Brick {

	onRender() {
		this.$$('form').on.submit(event=>{
			let credentials = {
				login: this.$$('login').node.value,
				password: this.$$('password').node.value,
			}
			fetch(magic.authApi, {method:'POST', body: JSON.stringify(credentials)})
				.then((res)=>{
					if(res.status === 200){
						document.location.href = '/'
					}else{
						ZengularNotification.show(ZengularNotification.style.danger, "fad fa-skull", 'Wrong login / password')
					}
				})
			event.preventDefault();
		})
//		super.onRender();
//		this.$$('config').on.mouse.click(() => this.fire(magic.event.selectItem, {handler: 'article', id: 1}));
//		this.fire(magic.event.menuHandlerSelected, {handler: 'user'});
//		this.fire(magic.event.selectItem, {handler: 'article', id: 1});
	}

}

