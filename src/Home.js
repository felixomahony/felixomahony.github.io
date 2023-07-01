import felix from "./assets/felix.JPG";
import "./App.css";
import ButtonBox from "./components/ButtonBox";
import cv from './assets/Felix O CV.pdf';
import gcnn from './assets/main.pdf';


function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={felix} className="App-logo" alt="Image of Felix O'Mahony" />
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
        </div>
        <ButtonBox
          description={
            "A simple machine learning game. Your goal is to beat a gradient descent algorithm at picking neural network parameters."
          }
          link={"/game"}
          title={"🎮 Min Sweeper"}
          sameSite={true}
        />
        <ButtonBox
          description={
            "A project to adapt the Neural Radiance Field method of 3D reconstruction for style transfer."
          }
          link={"https://github.com/felixomahony/nerf-pytorch"}
          title={"🎨 Neural Radiance Field Style Transfer"}
        />
        <ButtonBox
          description={
            "A project which uses group theory to perform colour-invariant image classification."
          }
          link={gcnn}
          title={"🌈 Colour Invariant Image Classification"}
        />
        <ButtonBox
          description={
            "Read Felix's CV, which includes his education, work experience, and skills."
          }
          link={cv}
          title={"📄 Curriculum Vitae"}
        />
        <ButtonBox
          description={
            "Articles Felix has written for various national and student publications."
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
