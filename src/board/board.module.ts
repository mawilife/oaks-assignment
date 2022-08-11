import { Module } from "@nestjs/common";
import { BoardRepositoryModule } from "./repositories/board.repository.module";
import { BoardResolver } from "./resolvers/board.resolver";
import { PhaseResolver } from "./resolvers/phase.resolver";
import { BoardService } from "./services/board.service";
import { PhaseService } from "./services/phase.service";
import { TaskService } from "./services/task.service";
import { TestController } from "./test.controller";

@Module({
  controllers: [TestController],

  imports: [BoardRepositoryModule],
  providers: [
    TaskService, PhaseService, BoardService, BoardResolver, PhaseResolver,
  ]
})
export class BoardModule { };