import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userschema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      unique: true,
      trim: true,
    },
    emai: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //coudinary url
      required: true,
    },
    coverimg: {
      type: String, //coudinary url
    },
    passward: {
      type: String,
      required: [true, "password is required"],
    },
    refershtoken: {
      type: String,
    },
    watchhistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "video",
      },
    ],
  },
  { timestamps: true }
);

userschema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.passward = await bcrypt.hash(this.passward, 10);
  next();
});

userschema.methods.isPasswardCorrect = async function (passward) {
  return await bcrypt.compare(passward, this.passward);
};
userschema.methods.generateAcessToken = function () {
  jwt.sign({
    _id: this._id,
    email: this.email,
    username: this.username,
    fullname: this.fullname,
  },
process.env.ACCESS_TOKEN_SECRET,
{
  expiresIn:process.env.ACCESS_TOKEN_EXPIRY

}
);
};
userschema.methods.generateRefressToken = function () {
  jwt.sign({
    _id: this._id,

  },
process.env.REFRESH_TOKEN_SECRET,
{
  expiresIn:process.env.REFRESH_TOKEN_EXPIRY

}
);
};
export const user = mongoose.model("user", userschema);
