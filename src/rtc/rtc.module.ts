import { Module } from '@nestjs/common';
import { RtcService } from './rtc.service';

@Module({
    providers: [RtcService],
})
export class EventsModule {}