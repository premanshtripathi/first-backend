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
  const { page = 1, limit = 50 } = req.query;
  const userId = req.user?._id;

  if (!isValidObjectId(channelId) || !isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid channel or user Id!");
  }

  if (channelId !== userId.toString()) {
    throw new ApiError(
      401,
      "You are not authorized to view subscribers of this channel!"
    );
  }

  const pipeline = [];

  pipeline.push({
    $match: { channel: new mongoose.Types.ObjectId(channelId) },
  });

  pipeline.push({
    $lookup: {
      from: "users",
      localField: "subscriber",
      foreignField: "_id",
      as: "subscriberDetails",
      pipeline: [{ $project: { username: 1, fullname: 1, avatar: 1 } }],
    },
  });

  pipeline.push({ $unwind: "$subscriberDetails" });

  const options = {
    page: parseInt(page),
    limit: Math.min(100, parseInt(limit)),
    customLabels: {
      docs: "subscribers",
      totalDocs: "totalSubscribers",
    },
  };

  const result = await Subscription.aggregatePaginate(
    Subscription.aggregate(pipeline),
    options
  );

  if (!result) {
    throw new ApiError(500, "Something went wrong while getting subscribers!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, result, "subscribers fetched successfully."));
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
