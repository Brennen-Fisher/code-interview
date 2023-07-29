import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./details.scss";
import { AuthContext } from "../../context/AuthContext";
import LightGallery from "lightgallery/react";
import "lightgallery/scss/lightgallery.scss";
import "lightgallery/scss/lg-zoom.scss";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import { LangContext } from "../../context/LangContext";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

// const details= async()=> {
// function Details() {
//     console.log("test");
// }
function Details() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { lang } = useContext(LangContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ["book"],
    queryFn: () =>
      newRequest.get(`/list/` + id).then((res) => {
        return res.data;
      }),
  });

  console.log(data);

  const [markup, setMarkup] = useState(false);
  const [show, setShow] = useState(false);
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    ref.current && setHeight(ref.current.clientHeight);
  }, []);

  return (
    <div className="detContainer">
      {data && (
        <div className="centerDiv">
          <div className="topRow">
            {data.image.length === 1 ? (
              <div id="imagePanel">
                <LightGallery speed={500} plugins={[lgThumbnail]}>
                  {data.image.map((e) => (
                    <a href={e}>
                      <img id="image" src={e} />
                    </a>
                  ))}
                </LightGallery>
              </div>
            ) : (
              <div id="imagesPanel">
                <LightGallery speed={500} plugins={[lgThumbnail]}>
                  {data.image.map((e) => (
                    <a href={e}>
                      <img id="image" src={e} />
                    </a>
                  ))}
                </LightGallery>
              </div>
            )}
            <div className="sidePanel">
              <p>
                {data.addy}, {data.country}{" "}
              </p>
              <h2>${price}</h2>
              <h3>
                {data.room}bd {data.bath}bath{" "}
                {data.m2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}m^2
              </h3>
              <div>
                <p>{data.sale === "sale" ? "For Sale" : "For Rent"}</p>
              </div>
              <br />
              <button onClick={null}>Save Listing</button>
            </div>
          </div>
          <div className="information">
            <h2>Facts:</h2>
            <div id="facts">
              <span>
                <h3>Style:</h3>
                <p>{formatOptionValue(data.style)}</p>
              </span>
              <span>
                <h3>Year:</h3>
                <p>Built In {data.year}</p>
              </span>
              <span>
                <h3>Lot Size:</h3>
                <p>
                  {data.lot
                    ? data.lot.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : "N/A"}
                </p>
              </span>
              <span>
                <h3>Beds:</h3>
                <p>{data.room}</p>
              </span>
              <span>
                <h3>Baths:</h3>
                <p>{data.bath}</p>
              </span>
            </div>
            <br />
            {data.phone || data.email || data.name ? (
              <div>
                <h2>Contact Info</h2>
                <div id="contact">
                  <p>
                    {data.name}:{" "}
                    {data.phone ? (
                      <div>{formatPhoneNumber(data.phone)}</div>
                    ) : null}{" "}
                    {data.email ? <div>{data.email}</div> : null}
                  </p>
                </div>
                <br />
              </div>
            ) : null}
            <h2>Features:</h2>
            <div id="tags">
              {data.feat.split(/\s*\|\s*/).map((e) => (
                <span className="tag">{e}</span>
              ))}
            </div>
            <br />
            <h2>About:</h2>
            <div id="about">
              {height >= 100 ? (
                <div>
                  <p id={show ? "show" : "hide"} ref={ref}>
                    {data && data.desc}
                  </p>
                  <a
                    type="button"
                    onClick={() => {
                      setShow(!show);
                      setMarkup(!markup);
                    }}
                  >
                    {markup ? "Hide" : "Show More"}
                  </a>
                </div>
              ) : (
                <p ref={ref}>{data && data.desc}</p>
              )}
            </div>
            <br />
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
