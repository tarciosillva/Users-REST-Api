import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface UserSocket {
  nome: string,
  id: string
}
@WebSocketGateway(80, {
  cors: {
    origin: '*',
  }
})

export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('EventsGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('msgToClient', payload, client.id);
  }

  @SubscribeMessage('privateMessage')
  handlePrivateMessage(client: Socket, payload: { recipient: string, message: string }): void {
    const { recipient, message } = payload;
    client.emit('privateMessage', message);
    this.server.to(recipient).emit('privateMessage', message);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  @SubscribeMessage('join')
  handleConnection(client: Socket): void {
    client.emit('welcome', `Bem-vindo, usuário ${client.id}!`);
  }

  @SubscribeMessage('disconnectTosocket')
  handleDisconnect(client: Socket) {
    client.disconnect();
  }
}