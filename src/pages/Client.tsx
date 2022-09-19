import { Button, Center, Group, Input, Stack } from "@mantine/core";
import { DataConnection } from "peerjs";
import React, { useContext, useEffect, useRef, useState } from "react";
import { PeerContext } from "../providers";

export const Client = () => {
  const { peerInstance } = useContext(PeerContext);
  const [peerConnection, setPeerConnection] = useState<DataConnection>();
  const [stream, setStream] = useState<null | MediaStream>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);

  useEffect(() => {
    document.title = "Client";

    peerInstance.on("open", function (id) {
      console.log("My peer ID is: " + id);
    });

    peerInstance.on("call", (call) => {
      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
          call.answer(stream);

          call.on("stream", (remoteStream) => {
            setStream(remoteStream);
          });
        });
    });
  }, []);

  useEffect(() => {
    if (videoRef.current && stream) {
      console.log("run");

      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
  }, [stream]);

  const handleConnectOwner = () => {
    if (inputRef.current) {
      const conn = peerInstance.connect(inputRef.current.value);
      setPeerConnection(conn);
    }
  };

  return (
    <Center style={{ minHeight: "100vh" }}>
      <Stack>
        <Group>
          <Input placeholder="Owner id" ref={inputRef} />
          <Button onClick={handleConnectOwner}>Connect</Button>
        </Group>
        <Group>
          {peerConnection?.peer && <p>Owner ID: {peerConnection?.peer}</p>}
        </Group>
        <Group>
          <audio ref={videoRef} controls autoPlay />
        </Group>
      </Stack>
    </Center>
  );
};

export default Client;
