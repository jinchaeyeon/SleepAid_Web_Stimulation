import React, { useEffect, useState, useRef } from "react";
import uPlot from "uplot";
import "/node_modules/uplot/dist/uPlot.min.css";

const NOW = Math.floor(Date.now() / 1e3);
let LENGTH = 3000;
let xs = [];
let ys = [];
export default function PlotEEG1(props) {
  const [shift, setShift] = useState(0);
  const [data, setData] = useState(getData(shift));
  const [plot, setPlot] = useState();

  const plotRef = useRef();
  const requestRef = useRef();
  const previousTimeRef = useRef();

  function getData(min) {
    if(xs.length == LENGTH) {
      xs.shift();
      ys.shift();
    }
    xs.push(NOW + min + LENGTH);
    ys.push(props.data);
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
