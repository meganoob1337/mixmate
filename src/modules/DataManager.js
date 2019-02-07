// This file is in charge of all interactions with the "external API" and the database.

export default {

	dataManager(fetchObject) {

		let databaseURL = "http://localhost:5002";
		let dataSet = fetchObject.dataSet;
		let embedItem = fetchObject.embedItem;
		let fetchType = fetchObject.fetchType;
		let databaseObject = fetchObject.databaseObject;
		let specificId = fetchObject.specificId;

		switch (fetchType) {

			case "GET-ALL":
				return fetch(`${databaseURL}/${dataSet}${embedItem}`)
				.then(r => r.json())

			case "GET":
				return fetch(`${databaseURL}/${dataSet}/${specificId}`)
				.then(r => r.json())

			case "POST":
				return fetch(`${databaseURL}/${dataSet}`, {
					method: `${fetchType}`,
					headers: {"Content-Type": "application/json; charset=utf-8"},
					body: JSON.stringify(databaseObject)
				})
				.then(r => r.json())

			case "PUT":
				return fetch(`${databaseURL}/${dataSet}/${specificId}`, {
					method: `${fetchType}`,
					headers: {"Content-Type": "application/json; charset=utf-8"},
					body: JSON.stringify(databaseObject)
				})
				.then(r => r.json())

			case "DELETE":
				return fetch(`${databaseURL}/${dataSet}/${specificId}`, {
					method: `${fetchType}`
				})
				.then(r => r.json())

			default: break;
		}
	}
}
