import React, { useRef, useEffect } from "react";

const MatrixAnimation = () => {
  // Create a ref for the canvas element
  const canvasRef = useRef(null);

  useEffect(() => {
    // Access the canvas element via the ref
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Setting the width and height of the canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Setting up the letters
    const letters =
      "010010011110001001010101010001010100101010101111001001100011001010101000101010111101010010101010001010101011001010101010110";
    const lettersArray = letters.split("");

    // Setting up the columns
    const fontSize = 30;
    const columns = canvas.width / fontSize;

    ctx.font = `${fontSize}px monospace`;
    // Setting up the drops
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    // Setting up the draw function
    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, .1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const text =
          lettersArray[Math.floor(Math.random() * lettersArray.length)];
        ctx.fillStyle = "#0f0";
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        drops[i]++;
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
      }
    }

    // Loop the animation
    const interval = setInterval(draw, 33);

    // Cleanup function to clear the interval
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this runs once after the initial render

  return (
    <canvas
      ref={canvasRef}
      className="canvas"
      style={{ display: "block", background: "black" }}
    ></canvas>
  );
};

export default MatrixAnimation;
