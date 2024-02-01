import { inspectable } from "inspectable";

import * as Interfaces from "@gramio/types/objects";
import * as Params from "@gramio/types/params";

import type { Bot } from "gramio";
import { applyMixins, filterPayload } from "#utils";
import type { Constructor, Optional, Require } from "#utils";
import { PreCheckoutQuery } from "../structures";

import { Context } from "./context";
import { ChatActionMixin, CloneMixin, SendMixin } from "./mixins";

interface PreCheckoutQueryContextOptions {
	bot: Bot;
	update: Interfaces.TelegramUpdate;
	payload: Interfaces.TelegramPreCheckoutQuery;
	updateId: number;
}

class PreCheckoutQueryContext extends Context {
	payload: Interfaces.TelegramPreCheckoutQuery;

	constructor(options: PreCheckoutQueryContextOptions) {
		super({
			bot: options.bot,
			updateType: "pre_checkout_query",
			updateId: options.updateId,
			update: options.update,
		});

		this.payload = options.payload;
	}

	/** Checks if the query has `shippingOptionId` property */
	hasShippingOptionId(): this is Require<this, "shippingOptionId"> {
		return this.shippingOptionId !== undefined;
	}

	/** Checks if the query has `orderInfo` property */
	hasOrderInfo(): this is Require<this, "orderInfo"> {
		return this.orderInfo !== undefined;
	}

	/** Answers to the pending pre-checkout query */
	answerPreCheckoutQuery(
		params: Optional<
			Params.AnswerPreCheckoutQueryParams,
			"pre_checkout_query_id"
		>,
	) {
		return this.bot.api.answerPreCheckoutQuery({
			pre_checkout_query_id: this.id,
			...params,
		});
	}

	/** Answers to the pending pre-checkout query. An alias for `answerPreCheckoutQuery` */
	answer(
		params: Optional<
			Params.AnswerPreCheckoutQueryParams,
			"pre_checkout_query_id"
		>,
	) {
		return this.answerPreCheckoutQuery(params);
	}
}

// @ts-expect-error [senderId: number] is not compatible with [senderId: number | undefined] :shrug:
interface PreCheckoutQueryContext
	extends Constructor<PreCheckoutQueryContext>,
		PreCheckoutQuery,
		SendMixin,
		ChatActionMixin,
		CloneMixin<PreCheckoutQueryContext, PreCheckoutQueryContextOptions> {}
applyMixins(PreCheckoutQueryContext, [
	PreCheckoutQuery,
	SendMixin,
	ChatActionMixin,
	CloneMixin,
]);

inspectable(PreCheckoutQueryContext, {
	serialize(context) {
		const payload = {
			id: context.id,
			from: context.from,
			senderId: context.senderId,
			currency: context.currency,
			totalAmount: context.totalAmount,
			invoicePayload: context.invoicePayload,
			shippingOptionId: context.shippingOptionId,
			orderInfo: context.orderInfo,
		};

		return filterPayload(payload);
	},
});

export { PreCheckoutQueryContext };
