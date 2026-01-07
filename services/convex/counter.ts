import { query, mutation } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const counter = await ctx.db.query("counter").first();

    if (!counter) {
      return 0;
    }

    return counter.value;
  },
});

export const increment = mutation({
  args: {},
  handler: async (ctx) => {
    const counter = await ctx.db.query("counter").first();

    if (!counter) {
      await ctx.db.insert("counter", { value: 1 });
      return 1;
    }

    const newValue = counter.value + 1;
    await ctx.db.patch(counter._id, { value: newValue });
    return newValue;
  },
});

export const decrement = mutation({
  args: {},
  handler: async (ctx) => {
    const counter = await ctx.db.query("counter").first();

    if (!counter) {
      await ctx.db.insert("counter", { value: -1 });
      return -1;
    }

    const newValue = counter.value - 1;
    await ctx.db.patch(counter._id, { value: newValue });
    return newValue;
  },
});
