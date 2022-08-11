
import { INestApplication } from '@nestjs/common';
import { IBoardRepository } from '../../src/board/repositories/iboard.repository';
import { IPhaseRepository } from '../../src/board/repositories/iphase.repository';
import { ITaskRepository } from '../../src/board/repositories/itask.repository';
import * as request from 'supertest';
import { createTestingApp } from '../test-helper';
import { PreviousPhasesNotCompletedException } from '../../src/exceptions/previous-phases-not-completed.exception';


describe('AppController (e2e)', () => {
  let app: INestApplication;
  let boardRepository: IBoardRepository;
  let phaseRepository: IPhaseRepository;
  let taskRepository: ITaskRepository;
  beforeAll(async () => {
    app = await createTestingApp();
    boardRepository = app.get(IBoardRepository)
    phaseRepository = app.get(IPhaseRepository)
    taskRepository = app.get(ITaskRepository)
    await app.init();
  });

  describe("Task Complate Tests", () => {
    it('Should be success', async () => {
      const board = await boardRepository.createNewBoard({ text: "Test Board" });
      const phase = await phaseRepository.createPhase({ text: "Phase1", order: 1, boardId: board.id });
      const tasks = await taskRepository.createTasks(phase.id, [{ text: "Task1", order: 1 }]);
      const query = `
        mutation {
          completeTask(
            boardId: "${board.id}"
            taskId: "${tasks[0].id}"
          ){
            id
            text
            phases { id text order tasks { id text order isCompleted } }
          }
        }
      `;

      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query,
          variables: {
            boardText: "board name",
            phaseText: "phase1",
            taskText: "task 1",
          },
        });

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined()
      expect(response.body.errors).not.toBeDefined()
      expect(response.body.data).toBeDefined()
      const boardResponse = response.body.data.completeTask;
      expect(boardResponse.phases[0].tasks[0].isCompleted).toBe(true);

    });

    it('Should throw', async () => {
      const board = await boardRepository.createNewBoard({ text: "Test Board" });
      const phase = await phaseRepository.createPhase({ text: "Phase1", order: 1, boardId: board.id });
      await taskRepository.createTasks(phase.id, [{ text: "Task1.1", order: 1 }]);
      const phase2 = await phaseRepository.createPhase({ text: "Phase1", order: 2, boardId: board.id });
      const tasks = await taskRepository.createTasks(phase2.id, [{ text: "Task2.1", order: 1 }]);
      const query = `
        mutation {
          completeTask(
            boardId: "${board.id}"
            taskId: "${tasks[0].id}"
          ){
            id
            text
            phases { id text order tasks { id text order isCompleted } }
          }
        }
      `;

      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query,
          variables: {
            boardText: "board name",
            phaseText: "phase1",
            taskText: "task 1",
          },
        });

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined()
      expect(response.body.errors).toBeDefined()
      expect(response.body.errors.length).toBeGreaterThan(0);
      expect(response.body.errors[0].message).toEqual((new PreviousPhasesNotCompletedException()).message);
    });
  });
});
