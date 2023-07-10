import "./Game.css";
import ButtonBox from "./components/ButtonBox";
import { useNavigate } from "react-router-dom";
//import json file
import articlesData from './assets/articles.json';
//import images
import nn_img from './assets/nn.png';
import nn_img_simple from './assets/simple_nn.png';

var Latex = require('react-latex');

function Articles() {
  const navigate = useNavigate();
    const goHome = () => {
        navigate("/")
    }
    const goToRepo = () => {
        //open github repo
        window.open("https://github.com/felixomahony/min-sweeper", "_blank");
    }
    const goToBook = () => {
      window.open("http://noiselab.ucsd.edu/ECE228/Murphy_Machine_Learning.pdf", "_blank");
    }
    const goToVideo = () => {
      window.open("https://youtu.be/aircAruvnKk", "_blank");
    }
  return (
    <div className="App">
      <header className="App-header">
        <div className="Column">
        <a onClick={goHome} style={{"textDecoration": "underline", "cursor":"pointer", "marginTop":"1rem"}}>Back to Felix O'Mahony</a>
        <a onClick={goToRepo} style={{"textDecoration": "underline", "cursor":"pointer", "marginTop":"1rem"}}>View Code on Github</a>
        <h1 style={{ "margin-bottom": "1rem" }}>🎮 Play Min Sweeper</h1>
        <p style={{ "margin-bottom": "1rem", "marginLeft": "0" }}>This is a game I developed to demonstrate the principles of stochastic gradient descent. To play, the user clicks in the left-hand box. This selects the values of two parameters (labelled x and y for ease) in a neural network which would typically be selected through stochastic gradient descent. The player selects these values aiming to classify as many of the points in the right-hand pane correctly as possible. The datapoints' classes are shown through their colours (pink and blue), and the background colour indicates the classification which will be made by the network at the given parameter values.</p>
        <p style={{ "margin-bottom": "1rem", "marginLeft": "0" }}>Once the user has had their turn, the computer then attempts the same task using gradient descent. Whoever classifies more points correctly wins the round and gains more points. The winner is the competitor who correctly classifies the most datapoints throughout the game.</p>

        <div className="GameContainer">
        <iframe allow="fullscreen" frameborder="0" border="0" src="https://felixomahony.github.io/min-sweeper/index.html" height="512" width="900">game not available</iframe></div>

        <h1>What is a Neural Network?</h1>
        <p style={{ "margin-bottom": "1rem", "marginLeft": "0" }}>A neural network is a method of relating nonlinear functions of single or multiple variables. In plain english, if we have an output which we know is related to a set of inputs, but the exact way it's related is very complex, we can use neural networks to approximate the relationship without ever directly calculating the relationship mathematically.</p>
        <p style={{ "margin-bottom": "1rem", "marginLeft": "0" }}>In this case, we have a set of datapoints which have classes (pink and blue). It is clear that looking at the datapoint clusterings, the class of a datapoint is related to its spatial location. However, in some cases this exact relationship appears very complex.</p>

        <p style={{ "margin-bottom": "1rem", "marginLeft": "0" }}>A neural network predicts the output variables by passing the input variables across several layers of neurons. Between each layer, the variables are scaled by pre-determined parameters and combined linearly. This is what allows neural networks to develop complex relationships between inputs and outputs. In this case, the network consists of four layers of neurons with 4, 4, 2 and 1 neuron(s) respectively. The inputs to the network are the two spatial coordinates of the datapoints, and the squares of the two spatial coordinates (known as feature maps).</p>

        <img src={nn_img  }></img>

        <p style={{ "margin-bottom": "1rem", "marginLeft": "0" }}>Typically we select the parameters of network through a process called 'gradient descent'. More detail is given in the following section. A network like this one has more than 50 parameters (this would be considered very small for a neural network). In each level of the game, 51 of these parameters have been pre-selected through gradient descent. You, the player, are invited to select the final two to make the network perform as well as you can. The computer then attempts to select the final two parameters through gradient descent. Whoever finds the best parameters wins!</p>

        <h1>What is Stochastic Gradient Descent?</h1>
        <p style={{ "margin-bottom": "1rem", "marginLeft": "0" }}>Stochastic gradient descent is the method a computer uses to find the best set of parameters for a particular classification problem. To complete gradient descent we do not require any prior knowledge of the relationship between input and output. All we need is a dataset of pre-labelled data with corresponding input values <Latex>$x_i$</Latex> and labels <Latex>$y_i$</Latex>. First let's consider a very simple network which takes only two inputs (<Latex>$x_1$ and $x_2$</Latex>) and in a single layer connexts them to a single output <Latex>y</Latex>. We might write this <Latex>$y_p=f(ax_1+bx_2)$</Latex> where we use the 'p' label to indicate that we are predicting the label y. Here, <Latex>$a$ and $b$</Latex> are the network parameters we want to select. <Latex>$f$</Latex> represents an 'activation function'. This can be any function we like which introduces nonlinearity. It can be as simple as <Latex>$f(x)=x^2$</Latex> since the square term introduces nonlinearity. A common choice is <Latex>$f(x)=1/(1+\exp(-x))$</Latex>. This is known as a sigmoid function.</p>

        <img src={nn_img_simple  }></img>

        <p style={{ "margin-bottom": "1rem", "marginLeft": "0" }}>The next task is to choose a 'loss function' <Latex>$L$</Latex>. This function tells us how poorly our network is performing. We will try to minimise this loss function, which we hope will mean that our network becomes a good approximation of the true relationship between the input and output. A simple choice of <Latex>$L$</Latex>, known as the least-squares loss, is the sum over each datapoint's label <Latex>$y_i$</Latex> of <Latex>$(y_i-y_p)^2$</Latex>.</p>

        <p style={{ "margin-bottom": "1rem", "marginLeft": "0" }}>Note, now, that the loss is a continuous function of the network parameters! This means that we can (usually) find the derivative of the loss function with respect to the parameters. Here we have two parameters, <Latex>$a$ and $b$</Latex>. If we use the sigmoid activation function introduced earlier then the derivative of the loss with respect to parameter a is simply the sum of <Latex>$dL/da=2(y_i-y_p)f(x_i)(1-f(x_i))a$</Latex> over each training datapoint. The proof is left as an exercise to the reader.</p>

        <p style={{ "margin-bottom": "1rem", "marginLeft": "0" }}>Finally, we update the parameter <Latex>$a$</Latex> to a new value <Latex>$a'$</Latex> so as to (hopefully) reduce the loss: <Latex>$a'=a-\lambda dL/da$</Latex>. <Latex>$\lambda$</Latex> is a hyperparameter called the learning rate. By repeatedly applying this algorithm, we gradually reduce the loss, improving the performance of the network.</p>

        <h1>Find Out More About Machine Learning</h1>

        <a onClick={goToBook} style={{"textDecoration": "underline", "cursor":"pointer", "marginTop":"1rem"}}>Murphy, K. P. - Machine Learning: A Probabilistic Perspective</a>
        <a onClick={goToVideo} style={{"textDecoration": "underline", "cursor":"pointer", "marginTop":"1rem"}}>3 Blue 1 Brown - Deep learning</a>
        <div style={{height:"3rem"}}></div>
        </div>
      </header>
    </div>
  );
}

export default Articles;