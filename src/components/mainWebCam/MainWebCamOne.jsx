import React from "react";
import "./style.css";
import Loading from "../loading/Loading";
import Webcam from "react-webcam";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useRef } from "react";
import Image from "../image/Image";

const videoConstraints = {
  width: 400,
  height: 400,
  aspectRatio: 0.7,
  facingMode: "user",
};

const MainWebCamOne = () => {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState(null);
  const [captureLoading, setCaptureLoading] = useState(false);
  const [isWebCamReady, setIsWebCamReady] = useState(false);

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
      setCaptureLoading(false);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="mainContainer">
      <div className="subContainer">
        {loading || captureLoading ? (
          <Loading />
        ) : (
          <>
            {!!pic ? (
              <Image src={pic} />
            ) : (
              <div className={isWebCamReady ? "showWeb" : "hideWeb"}>
                <Webcam
                  audio={false}
                  mirrored={true}
                  imageSmoothing={true}
                  videoConstraints={videoConstraints}
                  onUserMedia={() => setIsWebCamReady(true)}
                  ref={webcamRef}
                />
              </div>
            )}
          </>
        )}
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          capturePic();
        }}
      >
        Capture
      </button>
      <button onClick={retakePic}>ReCapture</button>
    </div>
  );
};

export default MainWebCamOne;
