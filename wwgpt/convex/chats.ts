import { mutation } from './_generated/server';

export const create = mutation({
    args: {},
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Called create chat without logged in user!");
        }

        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
            .unique();

        if (user === null) {
            throw Error("User not found!");
        }

        const chatId = await ctx.db.insert("chats", {
            userId: user._id,
            title: "New Chat",
        });
        return chatId;
    },
});