import React from 'react'
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

import './Audio.css'
 
const  Audio = () => {

const { 
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition 
    } = useSpeechRecognition();

if (!browserSupportsSpeechRecognition) {
  return <p>Browser does not support speech recognition.</p>;
}


return(
    <>
    <div>
        <p>Microphone:{listening ? 'on' : 'off'}</p>
        {/* <button onClick={SpeechRecognition.startListening}>start</button> */}
        <button onClick={() => SpeechRecognition.startListening({ continuous: true, language: "en-IN" })}>
  start
</button>
        <button onClick={SpeechRecognition.stopListening}>stop</button>
        <button onClick={resetTranscript}>reset</button>
        <p>{transcript}</p>
    </div>
    </>
)

}
export default Audio



