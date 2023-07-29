import createError from "../utils/createError.js";
import Review from "../model/review.model.js";

export const createReview = async (req, res, next) => {
  // res.send("register");
  try {

      const newReview = new Review({
          userId: req.userId,
          ...req.body,
      });
      await newReview.save();
      res.status(201).json(newReview);
  } catch (error) {
      next(error);
  }
}
export const updateReview = async (req, res, next) => {
  try {
    const updatedReview = await Review.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          ...req.body,
        },
      },
    );

    res.status(200).send(updatedReview);
  } catch (err) {
    next(err);
  }
}

export const getReviews = async (req, res, next) => {
  try {
      const review = await Review.find({postId: req.params.id});
      if (!review) next(createError(404, "Review not found!"));
      res.status(200).send(review);
  } catch (err) {
    console.log(err)
      next(err);
  }
}

export const getReview = async (req, res, next) => {
  try {
      const review = await Review.findById({userId: req.params.id});
      if (!review) next(createError(404, "Review not found!"));
      res.status(200).send(review);
  } catch (err) {
      next(err);
  }
}

export const deleteReview = async (req, res, next) => {
  //whatev
  // res.send("from controller");
  try {
      const review = await Review.findById(req.params.id);


      if (list.userId !== req.userId)
          return next(createError(403, "You can delete only your review!"));

      await Review.findByIdAndDelete(req.params.id);
      res.status(200).send("Deleted");

      // await User.findByIdAndDelete(req.params.id);
  } catch (error) {
      next(error);
  }
}