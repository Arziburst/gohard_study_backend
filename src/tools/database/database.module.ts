// Core
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports:    [ ConfigModule ],
            useFactory: (configService: ConfigService) => ({
                uri:               configService.get('MONGO_URL'),
                connectionFactory: (connection) => {
                    // eslint-disable-next-line global-require
                    connection.plugin(require('mongoose-autopopulate'));

                    return connection;
                },
            }),
            inject: [ ConfigService ],
        }),
    ],
})
export class DatabaseModule {}
