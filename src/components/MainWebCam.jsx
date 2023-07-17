import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import '../components/'

const MainWebCam = (props) => {
  const webcamRef = useRef(null);
  const [img, setImg] = useState(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    
    facingMode: "user",
  };
  const capturePic = useCallback(() => {
    const Image = webcamRef.current.getScreenshot();
    setImg(Image);
  }, [webcamRef]);

  const retakePic = () => {
    setImg(null);
  };

  return (
    <div>
      <div className="">
        {img ? (
          <img src={img} className="image" />
        ) : (
          <Webcam className="webcam"
            // width={props.width }
            // height={props.height}
            height={80 + "%"}
            width={80 + "%"}
            audio={false}
            mirrored={true}
            videoConstraints={videoConstraints}
            ref={webcamRef}
          />
        )}
      </div>
      <div className="">
        {img ? (
          <button onClick={retakePic}>Recapture</button>
        ) : (
          <button onClick={capturePic}>Capture</button>
        )}
      </div>
    </div>
  );
};

export default MainWebCam;
