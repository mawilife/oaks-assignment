import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { BoardModule } from './board/board.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: process.env.NODE_ENV == "development",
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    BoardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
