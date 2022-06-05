import { Module } from '@nestjs/common';
import { RtcGateway } from './rtc.gateway';
import { WebRTCModule, WebRTCService } from "../webrtc";

@Module({
    imports: [WebRTCModule],
    providers: [
        WebRTCService,
        RtcGateway,
    ],
})
export class EventsModule {}