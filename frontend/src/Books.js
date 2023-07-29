import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import newRequest from "./utils/newRequest";
import { reviewReducer, INITIAL_STATEREV } from "./reducer/reviewReducer";
import { commentReducer, INITIAL_STATECOM } from "./reducer/commentReducer";

const CommentHolder = (props) => {
  const [stateCom, dispatchCom] = useReducer(commentReducer, INITIAL_STATECOM);
  const [comments, setComments] = useState([]);
  const [commentId, setCommentId] = useState("");
  // let commentId;
  let editBool = false;

  const fetchComments = async () => {
    await axios
      .get("http://localhost:8800/api/comment/" + props.id)
      .then(function (response) {
        console.log(response.data);
        setComments(response.data);
        // comments = response.data;
        // renderContent();
      });
  };

  // const renderContent = () => {
  //   return (
  //     <div>
  //       {comments?.map((comment) => (
  //         <div>
  //           {comment.comment}
  //           <button></button>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };
  useEffect(() => {
    fetchComments();
    // renderContent(comments);
  }, []);

  console.log("first");
  return (
    <div>
      {comments?.map((comment) => (
        <div>
          {comment.comment}
          <button
            onClick={() => {
              console.log(comment._id);
              axios
                .put("http://localhost:8800/api/comment/" + comment._id, {
                  userId: "1",
                  postId: comment.postId,
                  comment: prompt("Enter New Comment"),
                })
                .then(function (response) {
                  console.log(response);
                })
                .catch(function (error) {
                  console.log(error);
                });
              // setCommentId(comment._id);
              // handleChangeCom({ name: "userId", value: "1" });
              // handleChangeCom({
              //   name: "postId",
              //   value: comment.postId,
              // });
              // handleChangeCom({
              //   name: "comment",
              //   value: prompt("Enter New Comment"),
              // });
            }}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

const RatingHolder = (props) => {
  const [ratings, setRatings] = useState([]);

  const fetchRatings = async () => {
    await axios
      .get("http://localhost:8800/api/review/" + props.id)
      .then(function (response) {
        console.log(response.data);
        setRatings(response.data);
      });
  };

  function calculateAverage(array) {
    var total = 0;
    var count = 0;

    array.forEach(function (item, index) {
      total += item.star;
      count++;
    });

    return total / count;
  }

  useEffect(() => {
    fetchRatings();
  }, []);
  console.log("second");
  return (
    <div>
      {/* {ratings?.map((rating) => (
        <div>{rating.star}</div>
      ))} */}
      {calculateAverage(ratings)}
    </div>
  );
};

const Books = () => {
  const url = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=v2rpPfKlLEj3aZav5qRGLqNYYx8c1my0`;
  const [books, setBooks] = useState([]);
  const [stateRev, dispatchRev] = useReducer(reviewReducer, INITIAL_STATEREV);
  const [stateCom, dispatchCom] = useReducer(commentReducer, INITIAL_STATECOM);
  const fetchBooks = async () => {
    // const res = await axios.get(url);
    // console.log(res.data.results.books);
    // setBooks(res.data.results.books);
    axios.get(url).then(function (response) {
      console.log(response.data.results.books);
      setBooks(response.data.results.books);
    });
  };

  const mutationRev = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/review/createReview", review);
    },
    onSuccess: () => {
      // navigate("/listings");
    },
  });

  const mutationCom = useMutation({
    mutationFn: (comment) => {
      return newRequest.post("/comment/createComment", comment);
    },
    onSuccess: () => {
      // navigate("/listings");
    },
  });

  const handleChangeRev = (e) => {
    dispatchRev({
      type: "CHANGE_INPUT",
      payload: { name: e.name, value: e.value },
    });
  };

  const handleChangeCom = (e) => {
    dispatchCom({
      type: "CHANGE_INPUT",
      payload: { name: e.name, value: e.value },
    });
  };

  useEffect(() => {
    console.log(stateRev);
    if (stateRev.star !== 0) {
      mutationRev.mutate(stateRev);
    }
  }, [stateRev]);

  useEffect(() => {
    console.log(stateCom);
    if (stateCom.comment !== 0) {
      mutationCom.mutate(stateCom);
    }
  }, [stateCom]);

  // const fetchComments = async (e) => {};

  // const { isLoading, error, data } = useQuery({
  //   queryKey: ["list"],
  //   queryFn: () =>
  //     newRequest.get(`/comment/` + "1649374046").then((res) => {
  //       return res.data;
  //     }),
  // });

  // console.log(data);

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <h1>books</h1>
      <div>
        {books &&
          books.map((book) => (
            // const {author, book_image, buy_links, description, price, primary_isbn, publisher, rank, title} = book
            <div>
              <article key={book.primary_isbn10}>
                <div>
                  <img src={book.book_image} alt={book.title} />
                </div>
                <div>
                  <h3>{book.title}</h3>
                  <h3>Rank: {book.rank}</h3>
                  <h4>{book.author}</h4>
                  <p>{book.description}</p>
                </div>
                <div>
                  <li>Publisher: {book.publisher}</li>
                  <li>ISBN: {book.primary_isbn10}</li>
                </div>
                <br />
              </article>
              <div>
                <h3>Rating for {book.title} is </h3>
                <div>
                  <button
                    onClick={() => {
                      handleChangeRev({ name: "userId", value: "1" });
                      handleChangeRev({
                        name: "postId",
                        value: book.primary_isbn10,
                      });
                      handleChangeRev({ name: "star", value: "1" });
                    }}
                  >
                    1
                  </button>
                  <button
                    onClick={() => {
                      handleChangeRev({ name: "userId", value: "1" });
                      handleChangeRev({
                        name: "postId",
                        value: book.primary_isbn10,
                      });
                      handleChangeRev({ name: "star", value: "2" });
                    }}
                  >
                    2
                  </button>
                  <button
                    onClick={() => {
                      handleChangeRev({ name: "userId", value: "1" });
                      handleChangeRev({
                        name: "postId",
                        value: book.primary_isbn10,
                      });
                      handleChangeRev({ name: "star", value: "3" });
                    }}
                  >
                    3
                  </button>
                  <button
                    onClick={() => {
                      handleChangeRev({ name: "userId", value: "1" });
                      handleChangeRev({
                        name: "postId",
                        value: book.primary_isbn10,
                      });
                      handleChangeRev({ name: "star", value: "4" });
                    }}
                  >
                    4
                  </button>
                  <button
                    onClick={() => {
                      handleChangeRev({ name: "userId", value: "1" });
                      handleChangeRev({
                        name: "postId",
                        value: book.primary_isbn10,
                      });
                      handleChangeRev({ name: "star", value: "5" });
                    }}
                  >
                    5
                  </button>
                  <RatingHolder id={book.primary_isbn10} />
                </div>
                <h3>Comments for {book.title}: </h3>
                <form
                  onSubmit={(e) => {
                    // e.preventDefault();
                    handleChangeCom({ name: "userId", value: "1" });
                    handleChangeCom({
                      name: "postId",
                      value: book.primary_isbn10,
                    });
                    handleChangeCom({
                      name: "comment",
                      value: e.target[0].value,
                    });
                  }}
                >
                  <input />
                  <button>Send</button>
                </form>
                <CommentHolder id={book.primary_isbn10} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Books;
