import { inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";
import { Invoice, Message } from "../structures";

import type { Constructor } from "#types";
import { applyMixins, memoizeGetters } from "#utils";

import type { BotLike } from "#types";
import { Context } from "./context";
import {
	ChatActionMixin,
	CloneMixin,
	NodeMixin,
	PinsMixin,
	SendMixin,
	TargetMixin,
} from "./mixins";

interface InvoiceContextOptions<Bot extends BotLike> {
	bot: Bot;
	update: TelegramObjects.TelegramUpdate;
	payload: TelegramObjects.TelegramMessage;
	updateId: number;
}

class InvoiceContext<Bot extends BotLike> extends Context<Bot> {
	payload: TelegramObjects.TelegramMessage;

	constructor(options: InvoiceContextOptions<Bot>) {
		super({
			bot: options.bot,
			updateType: "invoice",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** Invoice */
	get eventInvoice() {
		return new Invoice(this.payload.invoice as TelegramObjects.TelegramInvoice);
	}
}

interface InvoiceContext<Bot extends BotLike>
	extends Constructor<InvoiceContext<Bot>>,
		Message,
		TargetMixin,
		SendMixin<Bot>,
		ChatActionMixin<Bot>,
		NodeMixin<Bot>,
		PinsMixin<Bot>,
		CloneMixin<Bot, InvoiceContext<Bot>, InvoiceContextOptions<Bot>> {}
applyMixins(InvoiceContext, [
	Message,
	TargetMixin,
	SendMixin,
	ChatActionMixin,
	NodeMixin,
	PinsMixin,
	CloneMixin,
]);
memoizeGetters(InvoiceContext, ["eventInvoice"]);

inspectable(InvoiceContext, {
	serialize(context) {
		return {
			id: context.id,
			from: context.from,
			senderId: context.senderId,
			createdAt: context.createdAt,
			chat: context.chat,
			chatId: context.chatId,
			chatType: context.chatType,
			eventInvoice: context.eventInvoice,
		};
	},
});

export { InvoiceContext };
