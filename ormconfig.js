module.exports = [
    {
        name:        'default',
        type:        'postgres',
        url:         'postgres://usernameU:passwordP@192.168.99.100:5432/gohardstudy',
        dropSchema:  false,
        synchronize: false,
        logging:     false,
        entities:    [ 'src/bus/**/*.entity.ts' ],
        migrations:  [ 'src/database/migration/*.ts' ],
        subscribers: [ 'src/subscriber/**/*.ts' ],
        cli:         {
            // entitiesDir:    'src/entity',
            migrationsDir:  'src/database/migration',
            subscribersDir: 'src/subscriber',
        },
    },
];
