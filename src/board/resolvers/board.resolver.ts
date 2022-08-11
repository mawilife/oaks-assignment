import { Resolver, Query, Args, Mutation, ResolveField, Parent } from "@nestjs/graphql";
import { Phase } from "src/models/phase.model";
import { Board } from "../../models/board.model";
import { BoardService } from "../services/board.service";
import { PhaseService } from "../services/phase.service";
import { CreateBoardInput } from "./inputs/create-board.input";

@Resolver(() => Board)
export class BoardResolver {
  constructor(
    private readonly boardService: BoardService,
    private readonly phaseService: PhaseService,
  ) { }

  @Query(() => [Board])
  async findAll(): Promise<Board[]> {
    return await this.boardService.findAll();
  }

  @Query(() => Board)
  async getBoard(@Args("id") id: string) {
    return await this.boardService.getBoard(id);
  }

  @Mutation(() => Board)
  async completeTask(
    @Args("boardId") boardId: string,
    @Args("taskId") taskId: string,
  ): Promise<Board> {
    return await this.boardService.setTaskComplete(boardId, taskId)
  }

  @Mutation(() => Board)
  async createNewBoard(@Args("createBoardData") data: CreateBoardInput): Promise<Board> {
    const boardData = CreateBoardInput.toModel(data);
    const result = this.boardService.createBoard(boardData)
    return result;
  }

  @ResolveField(() => [Phase])
  async phases(@Parent() board: Board): Promise<Phase[]> {
    const phases = await this.phaseService.getPhases(board.id);
    return phases;
  }
}