import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoschema = new Schema(
  {
    videofile: {
      type: String,                    //coudinary url
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    owner: {
      type:Schema.Types.ObjectId,
      ref: "user",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    duration: {
      type: Number,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    ispublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
videoschema.plugin(mongooseAggregatePaginate)
export const video = mongoose.model("video", videoschema);
