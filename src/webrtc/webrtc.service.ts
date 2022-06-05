import {Injectable, Scope} from '@nestjs/common';
import {MediaStream, nonstandard, RTCPeerConnection} from 'wrtc';

const { RTCVideoSink, RTCVideoSource, RTCAudioSink, RTCAudioSource } = nonstandard;

@Injectable({ scope: Scope.REQUEST })
export class WebRTCService {
    private peerConnection: RTCPeerConnection;
    private answer: string;

    constructor() {
        this.peerConnection = new RTCPeerConnection();
        this.setEventListeners();
    }

    public async connection(offer) {
        await this.peerConnection.setRemoteDescription(offer);
        const answer = await this.peerConnection.createAnswer();
        await this.peerConnection.setLocalDescription(answer);
    }

    public get getAnswer() {
        return this.answer;
    }

    private setEventListeners() {
        this.peerConnection.ontrack = stream => this.onTrackHandler(stream);
        this.peerConnection.onicecandidate = () => this.onICECandidateHandler();
    }

    private onICECandidateHandler() {
        this.answer = this.peerConnection.localDescription;
    }

    private onTrackHandler(stream) {
        const remoteMediaStream = stream.streams[0];
        const videoSink = new RTCVideoSink(remoteMediaStream.getVideoTracks()[0]);
        const videoSource = new RTCVideoSource();
        const videoTrack = videoSource.createTrack()
        videoSink.onframe = ({ frame }) => {
            videoSource.onFrame(frame)
        };
        const audioSink = new RTCAudioSink(remoteMediaStream.getAudioTracks()[0])
        const audioSource = new RTCAudioSource();
        const audioTrack = audioSource.createTrack()
        audioSink.ondata = data => {
            audioSource.onData(data);
        };
        const mediaStream = new MediaStream();

        mediaStream.addTrack(audioTrack);
        mediaStream.addTrack(videoTrack);

        this.peerConnection.addTrack(audioTrack, mediaStream);
        this.peerConnection.addTrack(videoTrack, mediaStream);
    }

}
