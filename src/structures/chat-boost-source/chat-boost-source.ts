import * as Interfaces from "@gramio/types/objects";

import type { ChatBoostSourceGiftCode } from "./gift-code";
import type { ChatBoostSourceGiveaway } from "./giveaway";
import type { ChatBoostSourcePremium } from "./premium";

interface ChatBoostSourceMapping {
	premium: ChatBoostSourcePremium;
	gift_code: ChatBoostSourceGiftCode;
	giveaway: ChatBoostSourceGiveaway;
}

export class ChatBoostSource {
	constructor(public payload: Interfaces.TelegramChatBoostSource) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/** Is this chat boost source a certain one? */
	is<T extends Interfaces.TelegramChatBoostSource["source"]>(
		source: T,
	): this is ChatBoostSourceMapping[T] {
		return this.payload.source === source;
	}
}
