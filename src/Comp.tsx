import React, { useRef, useEffect, useState } from "react";

interface Box {
  value: number;
  xPos: number;
}

const CanvasAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [boxes, setBoxes] = useState<Box[]>([
    { value: 10, xPos: 20 },
    { value: 5, xPos: 60 },
    { value: 8, xPos: 100 },
    { value: 15, xPos: 140 },
    { value: 3, xPos: 180 },
    { value: 12, xPos: 220 },
  ]);
  const [targetValue, setTargetValue] = useState<number>(8);
  const [searchIndex, setSearchIndex] = useState<number | null>(null);
  const [searchBoxPos, setSearchBoxPos] = useState<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (ctx) {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);

      for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i];
        ctx.fillStyle = searchIndex === i ? "red" : "blue";
        ctx.fillRect(box.xPos, 10, 40, 40);
        ctx.fillStyle = "white";
        ctx.fillText(String(box.value), box.xPos + 15, 30);
      }

      if (searchBoxPos !== null) {
        const searchBox = { value: targetValue, xPos: searchBoxPos };
        ctx.fillStyle = "green";
        ctx.fillRect(searchBox.xPos, 60, 40, 40);
        ctx.fillStyle = "white";
        ctx.fillText(String(searchBox.value), searchBox.xPos + 15, 80);
      }
    }
  }, [boxes, searchIndex, searchBoxPos, targetValue]);

  const linearSearch = () => {
    let currentIndex = 0;

    const searchInterval = setInterval(() => {
      if (currentIndex >= boxes.length) {
        clearInterval(searchInterval);
        setSearchIndex(-1);
        return;
      }

      setSearchIndex(currentIndex);
      setSearchBoxPos(boxes[currentIndex].xPos);

      if (boxes[currentIndex].value === targetValue) {
        clearInterval(searchInterval);
        setSearchIndex(currentIndex);
        return;
      }

      currentIndex++;
    }, 1000);
  };

  return (
    <div>
      <canvas ref={canvasRef} width={400} height={100}></canvas>
      <button onClick={linearSearch}>Start Linear Search</button>
      <input
        type="number"
        value={targetValue}
        onChange={(e) => setTargetValue(Number(e.target.value))}
      />
    </div>
  );
};

export default CanvasAnimation;
