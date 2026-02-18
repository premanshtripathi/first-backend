import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  const userId = req.user?._id;

  if (!isValidObjectId(channelId) || !isValidObjectId(userId)) {
    throw new ApiError(400, "Channel Id or User Id is Invalid!");
  }

  if (channelId === userId.toString()) {
    throw new ApiError(400, "You cannot subscribe your own channel");
  }

  const isSubscribed = await Subscription.findOneAndDelete({
    channel: channelId,
    subscriber: userId,
  });

  if (isSubscribed) {
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Unsubscribed successfully."));
  }

  const newSubscription = await Subscription.create({
    channel: channelId,
    subscriber: userId,
  });

  if (!newSubscription) {
    throw new ApiError(500, "Something went wrong while subscribing!");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, newSubscription, "Subscribed successfully."));
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
