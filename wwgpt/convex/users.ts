import { mutation } from "./_generated/server";

export const store = mutation({
    args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called store user without logged in user!");
    }

    // Check if user exists in the database
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (user !== null) {
      return user._id;
    }

    // Create user in the database
    const userId = await ctx.db.insert("users", {
      tokenIdentifier: identity.tokenIdentifier,
      model: "gpt-3.5-turbo-1106",
    });

    await ctx.db.insert("chats", {
      userId,
      title: "New Chat",
    });

    return userId;
  },
})

