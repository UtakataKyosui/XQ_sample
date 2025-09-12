cd grpc_backend
sea-orm-cli migrate up -u postgres://postgres:postgres@localhost:6432/misskey 
sea-orm-cli generate entity -u postgres://postgres:postgres@localhost:6432/misskey -o ./src/models/entities