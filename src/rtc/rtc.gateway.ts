import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { WebRTCService } from '../webrtc';

@WebSocketGateway()
export class RtcGateway {
    @WebSocketServer()
    server: Server;

    constructor(
        private readonly webRTCService: WebRTCService,
    ) {}

    @SubscribeMessage('webrtc')
    async onOffer(client: any, data: any): Promise<WsResponse<any>> {
        await this.webRTCService.connection(data);
        const answer = this.webRTCService.getAnswer
        return { event: 'webrtc', data: answer };
    }
}