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

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) {
          throw new Error("Called selectGPT without authenticated user");
      }

      return await ctx.db
          .query("users")
          .withIndex("by_token", (q) =>
              q.eq("tokenIdentifier", identity.tokenIdentifier))
          .unique();
  }
})

export const selectGPT = mutation({
  args: { model: v.union(v.literal("gpt-3.5-turbo-1106"), v.literal("gpt-4-0125-preview")) },
  handler: async (ctx, args) => {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) {
          throw new Error("Called selectGPT without authenticated user");
      }

      const user = await ctx.db
          .query("users")
          .withIndex("by_token", (q) =>
              q.eq("tokenIdentifier", identity.tokenIdentifier))
          .unique();

      if (user === null) {
          throw new Error("User not found");
      }

      await ctx.db.patch(user._id, {
          model: args.model
      });

      return user._id;
  }
})

//update subscription
export const updateSubscription = internalMutation({
  args: { subscriptionId: v.string(), userId: v.id("users"), endsOn: v.number() },
  handler: async (ctx, { subscriptionId, userId, endsOn }) => {
      await ctx.db.patch(userId, {
          subscriptionId: subscriptionId,
          endsOn: endsOn
      });
  },
});

//Update subscription by ID
export const updateSubscriptionById = internalMutation({
  args: { subscriptionId: v.string(), endsOn: v.number() },
  handler: async (ctx, { subscriptionId, endsOn }) => {
      const user = await ctx.db.query("users")
          .withIndex("by_subscriptionId", (q) => q.eq("subscriptionId", subscriptionId))
          .unique();

      if (!user) {
          throw new Error("User not found!");
      }

      await ctx.db.patch(user._id, {
          endsOn: endsOn
      });
  },
});
