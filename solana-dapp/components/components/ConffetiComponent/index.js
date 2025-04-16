import React from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
};

export default class ConffetiComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.isAnimationEnabled = false;
    this.animationInstance = null;
    this.intervalId = null;
  }

  componentWillUnmount() {
    this.isAnimationEnabled = false;
    this.intervalId && clearInterval(this.intervalId);
  }

  componentDidMount() {
  }
  
  componentDidUpdate(prevProps) {
    if(this.props.startAnimation) {
      if(this.props.winner && !this.props.jackpot) {
        this.fire()
      }
      if(this.props.jackpot) {
        this.startAnimation()
        setTimeout(() => {
          this.pauseAnimation()
        },4000)
      }
    } else {
      this.stopAnimation()
    }
  }

  getAnimationSettings = (originXA, originXB) => {
    return {
      startVelocity: 25,
      spread: 400,
      ticks: 280,
      zIndex: 0,
      // particleCount: 150,
      origin: {
        x: randomInRange(originXA, originXB),
        y: Math.random() - 0.2
      },
      colors: ['#dcd18d','#d3a468', '#c0b990','#ba925e','#F0BD7A']
    };
  };

  nextTickAnimation = () => {
    this.animationInstance &&
      this.animationInstance(this.getAnimationSettings(0.1, 0.3));
    this.animationInstance &&
      this.animationInstance(this.getAnimationSettings(0.7, 0.9));
  };

  startAnimation = () => {
    if (!this.isAnimationEnabled) {
      this.isAnimationEnabled = true;
      this.intervalId = setInterval(this.nextTickAnimation, 400);
    }
  };

  pauseAnimation = () => {
    this.isAnimationEnabled = false;
    return this.intervalId && clearInterval(this.intervalId);
  };

  stopAnimation = () => {
    this.isAnimationEnabled = false;
    this.animationInstance && this.animationInstance.reset();
    return this.intervalId && clearInterval(this.intervalId);
  };

  getInstance = (instance) => {
    this.animationInstance = instance;
  };

  makeShot = (particleRatio, opts) => {
    this.animationInstance &&
      this.animationInstance({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
        colors: ['#dcd18d','#d3a468', '#c0b990','#ba925e','#F0BD7A']
      });
  };

  fire = () => {
    this.makeShot(0.25, {
      spread: 26,
      startVelocity: 55
    });

    this.makeShot(0.2, {
      spread: 60
    });

    this.makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });

    this.makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });

    this.makeShot(0.1, {
      spread: 120,
      startVelocity: 45
    });
  };

  render() {
    return (
      <ReactCanvasConfetti
        refConfetti={this.getInstance}
        style={canvasStyles}
        colors={['#dcd18d','#d3a468', '#c0b990','#ba925e','#F0BD7A']}
      />
    );
  }
}
