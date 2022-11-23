const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740&t=st=1669223568~exp=1669224168~hmac=48e7614aa6ed27e586add6039ac3f3265d868a20c71f6fcfc46b90305e76ffe2",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
