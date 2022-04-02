import * as WebSocket from 'ws';
import { WebSocketAdapter } from '@nestjs/common';
import { MessageMappingProperties } from '@nestjs/websockets';
import { Observable, fromEvent, EMPTY } from 'rxjs';
import { mergeMap, filter } from 'rxjs/operators';

export class WsAdapter implements WebSocketAdapter {
    constructor(private nativeHttpServer: any) {}

    create(): any {
        return new WebSocket.Server({
            server: this.nativeHttpServer,
        });
    }

    bindClientConnect(server, callback: Function) {
        server.on('connection', callback);
    }

    bindMessageHandlers(
        client: WebSocket,
        handlers: MessageMappingProperties[],
        process: (data: any) => Observable<any>,
    ) {
        fromEvent(client, 'message')
            .pipe(
                mergeMap(data => this.bindMessageHandler(data, handlers, process))
            )
            .subscribe(response => client.send(JSON.stringify(response)));
    }

    bindMessageHandler(
        buffer,
        handlers: MessageMappingProperties[],
        process: (data: any) => Observable<any>,
    ): Observable<any> {
        const message = JSON.parse(buffer.data);
        const messageHandler = handlers.find(
            handler => handler.message === message.event,
        );
        if (!messageHandler) {
            return EMPTY;
        }
        return process(messageHandler.callback(message.data));
    }

    close(server) {
        server.close();
    }
}
