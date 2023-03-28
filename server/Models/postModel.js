import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    desc: String,
    likes: [],
    image: String,
    // image:{
    //   public_id:{
    //     type:String,
    //     require:true
    //   },
    //   url:{
    //     type:String,
    //     require:true
    //   }
    // }
  },
  {
    timestamps: true,
  }
);

var PostModel = mongoose.model("Posts", postSchema);
export default PostModel;
