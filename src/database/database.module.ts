// Core
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Entities
import { Todo } from '../bus/Todo/todo.entity';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports:    [ ConfigModule ],
            inject:     [ ConfigService ],
            useFactory: (configService: ConfigService) => {
                const isProd = configService.get('NODE_ENV') === 'production';

                return {
                    type:        'postgres',
                    url:         configService.get('DATABASE_URL'),
                    dropSchema:  !isProd && false,
                    synchronize: !isProd && false,
                    logging:     !isProd && false,
                    entities:    [ Todo ],
                    migrations:  [ 'src/migration/**/*.ts' ],
                    // subscribers: [ 'src/subscriber/**/*.ts' ],
                    cli:         {
                        migrationsDir: 'migration',
                        // subscribersDir: 'src/subscriber',
                    },
                };
            },
        }),
    ],
})
export class DatabaseModule {}
