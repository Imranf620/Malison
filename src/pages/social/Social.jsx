import React from "react";
import "./social.css";

const Social = () => {
  return (
    <div>
      <div id="wrapper">
        <header class="cf">
          <img
            src="https://pixlr.com/images/index/ai-image-generator-one.webp"
            class="arrow"
          />
          <a href="/">
            <img
              class="profile-pic"
              src="https://pixlr.com/images/index/ai-image-generator-one.webp   "
            />
          </a>
          <h1 class="name">
            <a href="#">Tesla</a>
          </h1>
          <p class="date">2 hr ago</p>
        </header>

        <p class="status">
          Tesla drivers just passed 3 billion electric miles, saving the world
          120M gallons of gas 👍
        </p>
        <img
          class="img-content"
          src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
        />

        <div class="action">
          <div class="like">
            <a href="#">
              <img
                src="https://pixlr.com/images/index/ai-image-generator-one.webp"
                alt="thumbs up"
              />
              <p>Like</p>
            </a>
          </div>

          <div class="comment">
            <a href="#">
              <img src="https://pixlr.com/images/index/ai-image-generator-one.webp" />
              <p>Comment</p>
            </a>
          </div>

          <div class="share">
            <a href="#">
              <img
                src="http://download.seaicons.com/icons/icons8/windows-8/512/Arrows-Redo-icon.png"
                alt=""
              />
              <p>Share</p>
            </a>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default Social;
