import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
  const content = req.body?.content?.trim();
  const owner = req.user?._id;
  if (!content) {
    throw new ApiError(400, "Content must not be empty!");
  }
  if (!owner) {
    throw new ApiError(
      400,
      "User must be logged in to create a tweet, check the auth middleware"
    );
  }
  const tweet = await Tweet.create({
    content,
    owner,
  });
  if (!tweet) {
    throw new ApiError(500, "Something went wrong while creating the tweet!");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, tweet, "Tweet created successfully."));
});

const getUserTweets = asyncHandler(async (req, res) => {
  // TODO: get user tweets
});

const updateTweet = asyncHandler(async (req, res) => {
  const tweetId = req.params?.tweetId;
  const content = req.body?.content?.trim();

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweet id!");
  }

  if (!content) {
    throw new ApiError(400, "Tweet content must not be empty!");
  }

  const tweet = await Tweet.findById(tweetId);

  if (!tweet) {
    throw new ApiError(404, "Tweet does not exist!");
  }

  if (
    !tweet.owner ||
    !req.user?._id ||
    req.user?._id.toString() !== tweet.owner.toString()
  ) {
    throw new ApiError(401, "You are not authorized to update this tweet!");
  }

  tweet.content = content;
  const updatedTweet = await tweet.save();

  if (!updatedTweet) {
    throw new ApiError(
      500,
      "Something went wrong while updating the tweet in the database!"
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedTweet,
        "The tweet has been updated successfully."
      )
    );
});

const deleteTweet = asyncHandler(async (req, res) => {
  //TODO: delete tweet
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
