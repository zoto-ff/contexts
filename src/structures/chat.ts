import { Inspect, Inspectable } from "inspectable";

import type { TelegramObjects } from "@gramio/types";
import { Message } from "./message";

import { memoizeGetters } from "#utils";
import { Birthdate } from "./birthdate";
import { BusinessIntro } from "./business-intro";
import { BusinessLocation } from "./business-location";
import { BusinessOpeningHours } from "./business-opening-hours";
import { ChatLocation } from "./chat-location";
import { ChatPermissions } from "./chat-permissions";
import { ChatPhoto } from "./chat-photo";

/** This object represents a chat. */
@Inspectable()
export class Chat {
	constructor(public payload: TelegramObjects.TelegramChat) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Unique identifier for this chat. This number may be greater than 32 bits
	 * and some programming languages may have difficulty/silent defects in
	 * interpreting it. But it is smaller than 52 bits, so a signed 64 bit
	 * integer or double-precision float type are safe for storing
	 * this identifier.
	 */
	@Inspect()
	get id() {
		return this.payload.id;
	}

	/**
	 * Type of chat, can be either `private`, `group`, `supergroup` or `channel`
	 */
	@Inspect()
	get type() {
		return this.payload.type;
	}

	/** Title, for supergroups, channels and group chats */
	@Inspect({ nullable: false })
	get title() {
		return this.payload.title;
	}

	/** Username, for private chats, supergroups and channels if available */
	@Inspect({ nullable: false })
	get username() {
		return this.payload.username;
	}

	/** First name of the other party in a private chat */
	@Inspect({ nullable: false })
	get firstName() {
		return this.payload.first_name;
	}

	/** Last name of the other party in a private chat */
	@Inspect({ nullable: false })
	get lastName() {
		return this.payload.last_name;
	}

	/** `true`, if the supergroup chat is a forum (has [topics](https://telegram.org/blog/topics-in-groups-collectible-usernames#topics-in-groups) enabled) */
	@Inspect({ compute: true, nullable: false })
	isForum() {
		return this.payload.is_forum;
	}

	/**
	 * Chat photo.
	 *
	 * Returned only in `getChat`.
	 */
	@Inspect({ nullable: false })
	get photo() {
		const { photo } = this.payload;

		if (!photo) return undefined;

		return new ChatPhoto(photo);
	}

	/**
	 * If non-empty, the list of all active chat usernames; for private chats, supergroups and channels.
	 *
	 * Returned only in `getChat`.
	 */
	@Inspect({ nullable: false })
	get activeUsernames() {
		return this.payload.active_usernames;
	}

	/**
	 * For private chats, the date of birth of the user. Returned only in [getChat](https://core.telegram.org/bots/api/#getchat).
	 */
	@Inspect({ nullable: false })
	get birthdate() {
		return this.payload.birthdate
			? new Birthdate(this.payload.birthdate)
			: undefined;
	}

	/**
	 * For private chats with business accounts, the intro of the business. Returned only in [getChat](https://core.telegram.org/bots/api/#getchat).
	 */
	@Inspect({ nullable: false })
	get businessIntro() {
		return this.payload.business_intro
			? new BusinessIntro(this.payload.business_intro)
			: undefined;
	}

	/**
	 * For private chats with business accounts, the location of the business. Returned only in [getChat](https://core.telegram.org/bots/api/#getchat).
	 */
	@Inspect({ nullable: false })
	get businessLocation() {
		return this.payload.business_location
			? new BusinessLocation(this.payload.business_location)
			: undefined;
	}

	/**
	 * For private chats with business accounts, the opening hours of the business. Returned only in [getChat](https://core.telegram.org/bots/api/#getchat).
	 */
	@Inspect({ nullable: false })
	get businessOpeningHours() {
		return this.payload.business_opening_hours
			? new BusinessOpeningHours(this.payload.business_opening_hours)
			: undefined;
	}

	/**
	 * For private chats, the personal channel of the user. Returned only in `getChat`.
	 */
	@Inspect({ nullable: false })
	get personalChat(): Chat | undefined {
		const { personal_chat } = this.payload;

		if (!personal_chat) return undefined;

		return new Chat(personal_chat);
	}

	/**
	 * Identifier of the accent color for the chat name and backgrounds of the chat photo, reply header, and link preview. See accent colors for more details.
	 *
	 * Returned only in `getChat`.
	 *
	 * Always returned in `getChat`.
	 */
	@Inspect({ nullable: false })
	get accentColorId() {
		return this.payload.accent_color_id;
	}

	/**
	 * Custom emoji identifier of emoji chosen by the chat for the reply header and link preview background.
	 *
	 * Returned only in `getChat`.
	 */
	@Inspect({ nullable: false })
	get backgroundCustomEmojiId() {
		return this.payload.background_custom_emoji_id;
	}

	/**
	 * Identifier of the accent color for the chat's profile background. See profile accent colors for more details.
	 *
	 * Returned only in `getChat`.
	 */
	@Inspect({ nullable: false })
	get profileAccentColorId() {
		return this.payload.profile_accent_color_id;
	}

	/**
	 * Custom emoji identifier of the emoji chosen by the chat for its profile background.
	 *
	 * Returned only in `getChat`.
	 */
	@Inspect({ nullable: false })
	get profileBackgroundCustomEmojiId() {
		return this.payload.profile_background_custom_emoji_id;
	}

	/**
	 * Custom emoji identifier of emoji status of the other party in a private chat.
	 *
	 * Returned only in `getChat`.
	 */
	@Inspect({ nullable: false })
	get emojiStatusCustomEmojiId() {
		return this.payload.emoji_status_custom_emoji_id;
	}

	/**
	 * Expiration date of the emoji status of the other party in a private chat, if any.
	 *
	 * Returned only in `getChat`.
	 */
	@Inspect({ nullable: false })
	get emojiStatusExpirationDate() {
		return this.payload.emoji_status_expiration_date;
	}

	/**
	 * Bio of the other party in a private chat.
	 *
	 * Returned only in `getChat`.
	 */
	@Inspect({ nullable: false })
	get bio() {
		return this.payload.bio;
	}

	/**
	 * `true`, if privacy settings of the other party in the private chat allows
	 * to use `tg://user?id=<user_id>` links only in chats with the user.
	 *
	 * Returned only in `getChat`.
	 */
	@Inspect({ compute: true, nullable: false })
	hasPrivateForwards() {
		return this.payload.has_private_forwards as true | undefined;
	}

	/**
	 * `true`, if the privacy settings of the other party restrict sending voice and video note messages in the private chat.
	 *
	 * Returned only in `getChat`.
	 */
	@Inspect({ compute: true, nullable: false })
	hasRestrictedVoiceAndVideoMessages() {
		return this.payload.has_restricted_voice_and_video_messages;
	}

	/**
	 * `true`, if users need to join the supergroup before they can send messages.
	 *
	 * Returned only in `getChat`.
	 */
	@Inspect({ nullable: false })
	get joinToSendMessages() {
		return this.payload.join_to_send_messages as true | undefined;
	}

	/**
	 * `true`, if all users directly joining the supergroup need to be approved
	 * by supergroup administrators.
	 *
	 * Returned only in `getChat`.
	 */
	@Inspect({ nullable: false })
	get joinByRequest() {
		return this.payload.join_by_request as true | undefined;
	}

	/**
	 * For supergroups, the location to which the supergroup is connected
	 *
	 * Returned only in `getChat`.
	 */
	@Inspect({ nullable: false })
	get location() {
		const { location } = this.payload;

		if (!location) return undefined;

		return new ChatLocation(location);
	}

	/**
	 * Description, for groups, supergroups and channel chats.
	 *
	 * Returned only in `getChat`.
	 */
	@Inspect({ nullable: false })
	get description() {
		return this.payload.description;
	}

	/**
	 * Chat invite link, for groups, supergroups and channel chats.
	 * Each administrator in a chat generates their own invite links,
	 * so the bot must first generate the link using `exportChatInviteLink`.
	 *
	 * Returned only in `getChat`.
	 */
	@Inspect({ nullable: false })
	get inviteLink() {
		return this.payload.invite_link;
	}

	/**
	 * Pinned message, for groups, supergroups and channels.
	 *
	 * Returned only in `getChat`.
	 */
	@Inspect({ nullable: false })
	get pinnedMessage(): Message | undefined {
		const { pinned_message } = this.payload;

		if (!pinned_message) return undefined;

		return new Message(pinned_message);
	}

	/**
	 * Default chat member permissions, for groups and supergroups.
	 *
	 * Returned only in `getChat`.
	 */
	@Inspect({ nullable: false })
	get permissions() {
		const { permissions } = this.payload;

		if (!permissions) return undefined;

		return new ChatPermissions(permissions);
	}

	/**
	 * For supergroups, the minimum allowed delay between consecutive messages
	 * sent by each unprivileged user.
	 *
	 * Returned only in `getChat`.
	 */
	@Inspect({ nullable: false })
	get slowModeDelay() {
		return this.payload.slow_mode_delay;
	}

	/**
	 * The time after which all messages sent to the chat will be automatically deleted; in seconds.
	 *
	 * Returned only in `getChat`.
	 */
	@Inspect({ nullable: false })
	get messageAutoDeleteTime() {
		return this.payload.message_auto_delete_time;
	}

	/**
	 * `true`, if aggressive anti-spam checks are enabled in the supergroup. The field is only available to chat administrators.
	 *
	 * Returned only in `getChat`.
	 */
	@Inspect({ compute: true, nullable: false })
	hasAggressiveAntiSpamEnabled() {
		return this.payload.has_aggressive_anti_spam_enabled;
	}

	/**
	 * `true`, if non-administrators can only get the list of bots and administrators in the chat.
	 *
	 * Returned only in `getChat`.
	 */
	@Inspect({ compute: true, nullable: false })
	hasHiddenMembers() {
		return this.payload.has_hidden_members;
	}

	/**
	 * `true`, if messages from the chat can't be forwarded to other chats.
	 *
	 * Returned only in `getChat`.
	 */
	@Inspect({ compute: true, nullable: false })
	hasProtectedContent() {
		return this.payload.has_protected_content;
	}

	/**
	 * `true`, if new chat members will have access to old messages; available only to chat administrators.
	 *
	 * Returned only in `getChat`.
	 */
	@Inspect({ compute: true, nullable: false })
	hasVisibleHistory() {
		return this.payload.has_visible_history;
	}

	/**
	 * For supergroups, name of group sticker set.
	 *
	 * Returned only in `getChat`.
	 */
	@Inspect({ nullable: false })
	get stickerSetName() {
		return this.payload.sticker_set_name;
	}

	/**
	 * `true`, if the bot can change the group sticker set.
	 *
	 * Returned only in `getChat`.
	 */
	@Inspect({ compute: true, nullable: false })
	canSetStickerSet() {
		return this.payload.can_set_sticker_set;
	}

	/**
	 * Unique identifier for the linked chat,
	 * i.e. the discussion group identifier for a channel and vice versa;
	 * for supergroups and channel chats.
	 * This identifier may be greater than 32 bits and some programming languages
	 * may have difficulty/silent defects in interpreting it.
	 * But it is smaller than 52 bits, so a signed 64 bit integer or double-precision
	 * float type are safe for storing this identifier.
	 *
	 * Returned only in `getChat`.
	 */
	@Inspect({ nullable: false })
	get linkedChatId() {
		return this.payload.linked_chat_id;
	}

	/**
	 * For supergroups, the name of the group's custom emoji sticker set. Custom emoji from this set can be used by all users and bots in the group. Returned only in [getChat](https://core.telegram.org/bots/api/#getchat).
	 */
	@Inspect({ nullable: false })
	get customEmojiStickerSetName() {
		return this.payload.custom_emoji_sticker_set_name;
	}

	/**
	 * For supergroups, the minimum number of boosts that a non-administrator user needs to add in order to ignore slow mode and chat permissions. Returned only in [getChat](https://core.telegram.org/bots/api/#getchat).
	 */
	@Inspect({ nullable: false })
	get unrestrictBoostCount() {
		return this.payload.unrestrict_boost_count;
	}
}

memoizeGetters(Chat, ["photo", "location", "pinnedMessage", "permissions"]);
