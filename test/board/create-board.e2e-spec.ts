import { INestApplication, } from '@nestjs/common';
import * as request from 'supertest';
import { ValidationException } from '../../src/exceptions/validation.exception';
import { createTestingApp } from '../test-helper';


describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestingApp()
    await app.init();
  });

  describe("Create Board Tests", () => {
    it('Should be success', async () => {
      const query = `
        mutation {
          createNewBoard(
            createBoardData: {
              text: "Test Board"
              phases: [
                {
                  text: "Test Phase 1",
                  order: 1,
                  tasks: [{ text: "Test Task1", order: 1 }]
                },
              ]
            }
          ) { id }
        }`
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query,
          variables: {},
        })

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined()
      expect(response.body.errors).not.toBeDefined()
      expect(response.body.data).toBeDefined()

    });

    it('Should get Validation Execption', async () => {
      const query = `
        mutation {
          createNewBoard(
            createBoardData: {
              text: "Te"
              phases: [
                {
                  text: "Test Phase 1",
                  order: 1,
                  tasks: [{ text: "Test Task1", order: 1 }]
                },
              ]
            }
          ) { id }
        }`
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query,
          variables: {},
        })
      expect(response.body).toBeDefined();
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors.length).toBeGreaterThan(0);
      expect(response.body.errors[0].message).toEqual((new ValidationException()).message);
    });
  })

});
