import { Button, Center, CopyButton, Group, Stack } from "@mantine/core";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { PeerContext } from "../providers";

import audioPath from "../assets/audio/audioExample.mp3";

const getStreamFromAudioPath = (path: string) => {
  const audio = new Audio(path);
  const audioContext = new AudioContext();
  const audioSource = audioContext.createMediaElementSource(audio);
  const audioDestination = audioContext.createMediaStreamDestination();
  audioSource.connect(audioDestination);
  const stream = audioDestination.stream;

  return stream;
};

export const Owner = () => {
  const { peerInstance } = useContext(PeerContext);

  const videoRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);

  const [peerID, setPeerID] = useState("");
  const [clientID, setClientID] = useState("");
  const [stream, setStream] = useState<null | MediaStream>(null);

  useEffect(() => {
    document.title = "Owner";

    peerInstance.on("open", function (id) {
      console.log("My peer ID is: " + id);
      setPeerID(id);
    });

    peerInstance.on("connection", (conn) => {
      setClientID(conn.peer);

      console.log(conn);
    });
  }, []);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.loop = true;
      videoRef.current.play();
    }
  }, [stream]);

  const handleCall = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        const call = peerInstance.call(clientID, stream);

        call.on("stream", (remoteStream) => {
          setStream(stream);
        });
      });
  };

  const handleCallClient = async () => {
    const audio = new Audio(audioPath);
    const audioContext = new AudioContext();
    const audioSource = audioContext.createMediaElementSource(audio);
    const audioDestination = audioContext.createMediaStreamDestination();
    audioSource.connect(audioDestination);
    const stream = audioDestination.stream;

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }

    peerInstance.call(clientID, stream);

    await audio.play();
  };

  return (
    <Center style={{ minHeight: "100vh" }}>
      <Stack>
        <Group>
          <CopyButton value={peerID}>
            {({ copied, copy }) => (
              <Button
                color={copied ? "teal" : "blue"}
                onClick={copy}
                disabled={!peerID}
              >
                {copied ? "Copied peer ID" : "Copy peer ID"}
              </Button>
            )}
          </CopyButton>
        </Group>

        {clientID && <p>Client Id: {clientID}</p>}

        <Group>
          {clientID && <Button onClick={handleCallClient}>Call Client</Button>}
        </Group>

        <audio ref={videoRef} controls autoPlay />
      </Stack>
    </Center>
  );
};

export default Owner;
