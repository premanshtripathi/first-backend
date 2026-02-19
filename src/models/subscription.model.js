import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const subscriptionSchema = new Schema(
  {
    subscriber: {
      type: Schema.Types.ObjectId, // the one who is subscribing.
      ref: "User",
      required: [true, "Subscriber Id is required!"],
    },

    channel: {
      type: Schema.Types.ObjectId, // the one to whom subscriber is subscribing.
      ref: "User",
      required: [true, "Channel Id is required!"],
      validate: {
        validator: function (channelId) {
          return channelId.toString() !== this.subscriber.toString();
        },
      },
    },
  },
  { timestamps: true }
);

subscriptionSchema.index({ channel: 1, subscriber: 1 }, { unique: true });
subscriptionSchema.index({ subscriber: 1 });

subscriptionSchema.plugin(mongooseAggregatePaginate);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
