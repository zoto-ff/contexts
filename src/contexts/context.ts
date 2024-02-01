import { inspectable } from "inspectable";

import * as Interfaces from "@gramio/types/objects";

import type { Bot } from "gramio";
import { SERVICE_MESSAGE_EVENTS } from "#utils";

import type {
	ContextsMapping,
	MaybeArray,
	SoftString,
	UpdateName,
} from "#utils";

interface ContextOptions {
	bot: Bot;
	update?: Interfaces.TelegramUpdate;
	updateType: UpdateName;
	updateId?: number;
}

class Context {
	bot: Bot;
	updateId?: number;
	update?: Interfaces.TelegramUpdate;

	protected updateType: UpdateName;

	constructor(options: ContextOptions) {
		this.bot = options.bot;
		this.updateType = options.updateType;
		this.updateId = options.updateId;
		this.update = options.update;
	}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	is<T extends UpdateName>(rawTypes: MaybeArray<SoftString<T>>) {
		const types = Array.isArray(rawTypes) ? rawTypes : [rawTypes];

		// TODO: it is interfering, make 'subTypes' logic maybe?
		if (types.includes("service_message")) {
			types.push(...SERVICE_MESSAGE_EVENTS);
		}

		return types.includes(this.updateType);
	}
}

interface Context {
	is<T extends UpdateName>(
		rawTypes: MaybeArray<SoftString<T>>,
	): this is ContextsMapping[T];
}

inspectable(Context, {
	serialize(context) {
		return {};
	},
});

export { Context };
