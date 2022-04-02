import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway()
export class RtcGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('events')
    onEvent(client: any, data: any): WsResponse<string> {
        console.log('data', data);
        return { event: 'events1', data: 'DATA' };
    }
}