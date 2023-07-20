import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import "./WebcamStyle.css";
import { useEffect } from "react";

const MainWebCam = () => {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [pic, setPic] = useState(null);
  const [captureLoading, setCaptureLoading] = useState(false);

  const videoConstraints = {
    width: 400,
    height: 400,
    aspectRatio: 0.7,
    facingMode: "user",
  };

  useEffect(() => {
    const userMedia = async () => {
      setLoading(true);
      try {
        const steam = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        webcamRef.current.srcObject = steam;
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    userMedia();
  }, [webcamRef]);

  const capturePic = useCallback(() => {
    setCaptureLoading(true);
    const Image = webcamRef.current.getScreenshot();
    setPic(Image);
    setCaptureLoading(false);
  }, [webcamRef]);

  const retakePic = () => {
    setCaptureLoading(true);
    setTimeout(() => {
      setPic(null);
      console.log("star");
    }, 3300);
  };

  return (
    <div className="mainContainer">
      {loading ? (
        <>
          <div class="loading-container">
            <div class="loading-circle"></div>
          </div>
        </>
      ) : (
        <>
          {pic === null ? (
            <>
              <div className="webcamContainer">
            //web
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  capturePic();
                }}
              >
                Capture
              </button>
            </>
          ) : (
            <>
              {captureLoading ? (
                <div className="loading-container">
                  <div className="loading-circle"></div>
                </div>
              ) : (
                <>
                  <img src={pic} className="capImg" />
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MainWebCam;
