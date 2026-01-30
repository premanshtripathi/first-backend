import { mongoose } from "mongoose";

const subscriptionSchema = new Schema(
  {
    subscriber: {
      type: Schema.types.ObjectId, // the one who is subscribing.
      ref: "User",
    },

    channel: {
      type: Schema.types.ObjectId, // the one to whom subscriber is subscribing.
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
