import { Inspect, Inspectable } from "inspectable";

import * as Interfaces from "@gramio/types/objects";

/** This object represents the bot's short description. */
@Inspectable()
export class BotShortDescription {
	constructor(public payload: Interfaces.TelegramBotShortDescription) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** The bot's short description */
	@Inspect()
	get description() {
		return this.payload.short_description;
	}
}
