import React, { useCallback, useEffect, useRef, useState } from 'react'
import { parseState } from '../helpers/helper';
import YouTube from 'react-youtube';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const opts = {
    playerVars: {
        controls: 0,
        disablekb: 1,
        fs: 0,
        rel: 0,
    }
}

const LoopState = {
    STOPPED: 'STOPPED',
    A: 'A',
    B: 'B'
}

export default function Player(props) {
    // Required for handling start/stop and on loop
    const [isPlaying, setIsPlaying] = useState(false);
    // Needed to handle initial loading case
    const [player, setPlayer] = useState(null);
    // Store to clear on stop
    // These change inside useEffect. Hence must be refs
    // to avoid loop
    const intervalId = useRef(null);
    const loopState = useRef(LoopState.STOPPED);

    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();


    const doB = useCallback(() => {
        player.pauseVideo();
        SpeechRecognition.startListening();
    }, [player])

    const doA = useCallback(() => {
        player.playVideo();
        resetTranscript();
        SpeechRecognition.stopListening();
    }, [player, resetTranscript])

    const switcher = useCallback(() => {
        if (loopState.current === LoopState.A) {
            loopState.current = LoopState.B;
            doB()
        }
        else {
            loopState.current = LoopState.A;
            doA()
        }
    }, [loopState, doA, doB]);

    useEffect(() => {
        if (isPlaying && player) {
            // Call it the first time
            switcher();

            // Create interval
            intervalId.current = setInterval(switcher, 5000);
        }
    }, [player, isPlaying, switcher]);

    const handleStart = () => {
        setIsPlaying(true);
    };

    const handleStop = () => {
        setIsPlaying(false);
        loopState.current = LoopState.STOPPED;
        clearInterval(intervalId.current);
        if (player) {
            player.stopVideo();
        }
    };

    return browserSupportsSpeechRecognition ? (
        <div className='mx-2'>
            <h4>Transcript: {transcript} </h4>
            <h4>Loop State: {parseState(loopState.current.toString())}</h4>
            <br />
            <YouTube
                videoId={props.videoId}
                onReady={(e) => { setPlayer(e.target) }}
                opts={opts} />
            <br />
            <button onClick={handleStart} className='mx-2 btn btn-primary'>Start</button>
            <button onClick={handleStop} className='mx-2 btn btn-danger'>Stop</button>
        </div>
    ) : (<span className='mx-2'>Browser does not support speech recognition</span>)

}
