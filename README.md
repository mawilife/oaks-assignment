# Oak's Lab Back-End Board Assıgment

This is the solution for audition assignment for back-end.

## Installation

```bash
npm install
```

## Usage

### Running Server

```bash
npm run start:dev
```

You can access the playground on development environment go to [http://localhost:3000/graphql](http://localhost:3000/graphql)

### Testing

```bash
npm run test
```

### Example Queries & Mutations

Find All:

```graphql
{
  findAll {
    id
    text
    phases {
      id
      text
      order
      isCompleted
      tasks {
        id
        text
        order
        isCompleted
      }
    }
  }
}
```

Create New Board:

```graphql
mutation {
  createNewBoard(
    createBoardData: {
      text: "Metin"
      phases: [
        {
          text: "Ph1"
          order: 1
          tasks: [{ text: "t11", order: 1 }, { text: "t12", order: 2 }]
        }
        {
          text: "Ph2"
          order: 2
          tasks: [{ text: "t21", order: 1 }, { text: "t22", order: 2 }]
        }
      ]
    }
  ) {
    id
    text
    phases {
      id
      text
      order
      isCompleted
      tasks {
        id
        text
        order
        isCompleted
      }
    }
  }
}
```

Complete Task

```graphql
mutation {
  completeTask(
    boardId: "cd0bb6f3-a6d1-4c18-beba-514f2f31cfc7"
    taskId: "e218ca16-228c-4692-8990-6a7842cf4776"
  ) {
    id
    text
    phases {
      id
      text
      order
      isCompleted
      tasks {
        id
        text
        order
        isCompleted
      }
    }
  }
}
```

Raşit Şakar

rasitsakar94@gmail.com
