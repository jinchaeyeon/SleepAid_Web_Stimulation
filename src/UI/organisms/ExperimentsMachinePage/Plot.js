import React, { useEffect, useState, useRef } from "react";
import uPlot from "uplot";
import "/node_modules/uplot/dist/uPlot.min.css";

const NOW = Math.floor(Date.now() / 1e3);
const LENGTH = 50000;

export default function Plot(props) {
  const [shift, setShift] = useState(0);
  const [data, setData] = useState(getData(shift));
  const [plot, setPlot] = useState();

  const plotRef = useRef();
  const requestRef = useRef();
  const previousTimeRef = useRef();

  function getData(min) {
    let xs = [];
    let ys = [];
  
    for (let i = min; i < min + LENGTH; i++) {
      xs.push(NOW + i);
      ys.push(Math.sin(i / 16) * 5);
    }
  
    return [xs, ys];
  }

  useEffect(() => {
    let animate = (time) => {
      if (previousTimeRef.current !== undefined) {
        if (!plot) return;
        setShift((prevShift) => prevShift + 1);
        setData((prev) => getData(shift));
        plot.setData(data);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      animate = () => {};
      cancelAnimationFrame(requestRef.current);
    };
  }, [data, plot, shift]);

  useEffect(() => {
    const plot = new uPlot(props.options, data, plotRef.current);
    setPlot(plot);

    return () => {
      plot.destroy();
    };
  }, []);

  return (
    <div>
      <div ref={plotRef} />
    </div>
  );
}
