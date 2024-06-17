import React, { useState } from "react";
import felix from "./assets/felix.JPG";
import "./App.css";
import ButtonBox from "./components/ButtonBox";
import cv from './assets/Felix O CV.pdf';


function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const targetObject = React.useRef(null);
  const [lateralPosition, setLateralPosition] = useState("");
  const [verticalPosition, setVerticalPosition] = useState("");

  const handleMouseMove = (event) => {
    const rect = targetObject.current.getBoundingClientRect();
    const width = rect.right - rect.left;
    const height = rect.bottom - rect.top;
    const x = event.clientX;
    const y = event.clientY;
    setMousePosition({ x, y });
    setLateralPosition(
      x < rect.left ? event.clientX - rect.left : 
      x > rect.right ? event.clientX - rect.right:
      0);
    
    console.log(lateralPosition);
  };

  return (
    <div className="App" onMouseMove={handleMouseMove}>
      <header className="App-header">
        <div ref={targetObject}>
        <img  src={felix} className="App-logo" alt="Image of Felix O'Mahony" />
        </div>
        <h1>Felix O'Mahony</h1>
        <div className="linkcontainer">
          <a
            href="https://github.com/felixomahony"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <a
            href="https://www.linkedin.com/in/felix-o-mahony-37851213a/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>

          <a
            href="https://twitter.com/FelixOMahony"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            href="mailto:remove_this_felixomahony@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Email
          </a>
        </div>
        <ButtonBox
          description={
            "A simple machine learning game. Your goal is to beat a gradient descent algorithm at picking neural network parameters."
          }
          link={"/game"}
          title={"🎮 Play Min Sweeper"}
          sameSite={true}
          //only active if not on mobile
          active={window.innerWidth > 600}
          beta={true}
        />
        <ButtonBox
          description={
            "In this paper, we introduce convolutional neural networks equivariant to variations in hue and saturation by design."
          }
          link={"https://arxiv.org/abs/2406.09588"}
          title={"🎨 Color Equivariant Network (CVPR '24 Equivision Workshop)"}
          new={true}
        />
        <ButtonBox
          description={
            "A project to adapt the Neural Radiance Field method of 3D reconstruction for style transfer."
          }
          link={"https://github.com/felixomahony/nerf-pytorch"}
          title={"💅 Neural Radiance Field Style Transfer"}
        />
        <ButtonBox
          description={
            "CV detailing my education and work experience."
          }
          link={cv}
          title={"📄 Curriculum Vitae"}
        />
        <ButtonBox
          description={
            "Articles written for various national and student publications."
          }
          link={"/articles"}
          title={"📰 Writing"}
          sameSite={true}
        />
      </header>
    </div>
  );
}

export default Home;
