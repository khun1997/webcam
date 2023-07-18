import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import "./WebcamStyle.css";

const MainWebCam = () => {
  const webcamRef = useRef(null);
  const [pic, setPic] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [data,setData] = useState([])
  const videoConstraints = {
    width: 400,
    height: 400,
    aspectRatio: 0.7,
    facingMode: "user",
  };
  const capturePic = useCallback(
    (e) => {
      const Image = webcamRef.current.getScreenshot();
      setPic(Image);
    },
    [webcamRef]
  );

  const retakePic = () => {
    setPic(null);
  };

  const handleSubmit = (e) => {
    setName("");
    setEmail("");
    setData(data)
    // e.preventDefault();
    console.log(name)
    console.log(email``)
  };
  const handleName = (e) => {
    setName({name:e.target.value});
    // e.preventDefault();
  };
  const handleEmail = (e) => {
    setEmail({email:e.target.value});
    // e.preventDefault();
  };
  return (
    <div className="mainContainer">
      <form className="formContainer" onSubmit={() => handleSubmit()}>
        {pic === null ? (
          <>
            <Webcam
              className="webcam"
              width={400}
              height={400}
              audio={false}
              mirrored={true}
              imageSmoothing={true}
              videoConstraints={videoConstraints}
              ref={webcamRef}
            />

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
            <img src={pic} />
            <button
              onClick={(e) => {
                e.preventDefault();
                retakePic();
              }}
            >
              ReCapture
            </button>
          </>
        )}

        <div className="inputContainer">
          <input type="text" placeholder="username" onChange={()=>handleName} />
          <input type="text" placeholder="email" onChange={()=>handleEmail} />
          <button type="submit">Submit</button>
        </div>

        <p>{name}</p>
      <p>{email}</p>
      <p>{data}</p>
      </form>




      {/* {pic !== null && name && email ? (
        <>
        <h1>hello</h1>
          <div className="resultContainer">
                <p>{name}</p>
                <p>{email}</p>
          </div>
        </>
      ) : (
        <></>
      )} */}
    </div>
  );
};

export default MainWebCam;
