import createError from "../utils/createError.js";
import Comment from "../model/comment.model.js";

export const createComment = async (req, res, next) => {
  try {
      const newComment = new Comment({
          userId: req.userId,
          ...req.body,
      });
      await newComment.save();
      res.status(201).json(newComment);
  } catch (error) {
      next(error);
  }
}
export const updateComment = async (req, res, next) => {
  try {
    const updatedComment = await Comment.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...req.body,
        },
      },
    );

    res.status(200).send(updatedComment);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.findOne({ _id: req.params.id });
    res.status(200).send(comments);
  } catch (err) {
    next(err);
  }
}

export const getComment = async (req, res, next) => {
  try {
      const comments = await Comment.find({postId: req.params.id});
      if (!comments) next(createError(404, "Comment not found!"));
      res.status(200).send(comments);
  } catch (err) {
    console.log(err)
      next(err);
  }
}

export const deleteComment = async (req, res, next) => {
  //whatev
  // res.send("from controller");
  try {
      const comment = await Comment.findById(req.params.id);


      if (list.userId !== req.userId)
          return next(createError(403, "You can delete only your Comment!"));

      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).send("Deleted");

      // await User.findByIdAndDelete(req.params.id);
  } catch (error) {
      next(error);
  }
}