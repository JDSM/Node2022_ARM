module.exports = {
    api:{
        port: process.env.API_PORT || 3000
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret!'
    },
    postgres: {
        host: process.env.PS_HOST || 'localhost',
        user: process.env.PS_USER || 'postgres',
        password: process.env.PS_PASS || 'Danmariel1810',
        database: process.env.PS_DB || 'PLATZI_AMR',
        port: process.env.PORT || 5432
    },
    postgresService: {
        host: process.env.POSTGRES_SRV_HOST || 'localhost',
        port: process.env.POSTGRES_SRV_PORT || 3001
    },
    post: {
        port: process.env.POST_PORT || 3002,
    },
}