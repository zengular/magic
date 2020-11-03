export default class User{
	/**
	 * @param {string} id
	 * @param {string} name
	 * @param {string} avatar
	 * @param {Array} roles
	 */
	constructor(id, name, avatar, roles) {
		this.id = id;
		this.name = name;
		this.avatar = avatar;
		this.roles = roles;
	}

	hasRole(roles){
		if(typeof roles === "string") roles = roles.split(',');
		let result = false;
		roles.forEach(role=>{
			if(this.roles[role.trim()] === true) result = true;
		});
		return result;
	}

}