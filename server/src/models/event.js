const mongoose = require('mongoose')

const model = mongoose.model(
	'Event',
	new mongoose.Schema({
		created: { type: Date, default: Date.now },
		targetType: { type: String, required: true },
		target: { type: String, default: JSON.stringify({}) }
	})
)
module.exports = class Event {
	static get model() {
		return model
	}
}
