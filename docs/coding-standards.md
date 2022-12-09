# Coding Standards
This document outlines coding standards for use at [Codern](https://github.com/vectier/codern).

## Prerequisite
- Make sure you have installed [ESLint](https://eslint.org/) and [EditorConfig](https://editorconfig.org/) on your code editor to follow our coding standards easier.

---

## Backend

### Overview
Our works is done in strongly typed programming language with [TypeScript](https://www.typescriptlang.org/). In the architectural structure we prefer [Microservice Architecture](https://microservices.io/) for scaleability and maintainabilty across the whole project.

### Architectural Introduction
**Synchronous** and **Asynchronous** communication is used in our project. We centralize a client request with **API gateway** (single entry point).

#### Synchronous communication
You should use this communication pattern only on a short-time request (The caller sends a message and waits for the response in a blocking way). In other words, the request that needs a response instantly. For example:
- `/auth/me` - Response a authenticated user data
  - Only accessing to the data abstraction layer only to archive a response.

<!-- TODO: add diagram -->

And we use Synchronous communication on long-time requests only for sending acknowledgments to notify the user that our backend is accepted the request to process the request continuously. For example:
- Request to grade a sourcecode:
  - After the client request to this API route, when API gateway recieve a request, should respond with message like `We accept your code and queue it for grading` to improve the user-experience and call the sub-service (Grading Service) in a sequence to process the sourcecode after that in the Asynchronous communication way.

All of the mentioned above, we use [gRPC](https://grpc.io/) to synchronouly communicate between API gateway and sub-services that included out-of-box in our prefered backend framework, [NestJS](https://nestjs.com/).

#### Asynchronous communication
You should use this communication pattern after the API gateway sends an acknowledgment to the client for processing the request with sub-services, we prefer to use AMQP to do the task for us with [RabbitMQ](https://www.rabbitmq.com/).

The reason to use AMQP is that we want to interact with sub-services without any dependency or make loosely coupled. API gateway or sender sends a message or event to the message broker system and no need to wait for the reply. Only the consumer consumes from several microservices which are subscribing to this message on the message broker like RabbitMQ.

In the failure scenario, the consumer is down. The message is still persistently in the message broker without loss and the system waits for the consumer to be available and continuously receives a message and continues the process.

### Standards

#### 1. Add a API route data passing definition

- 1.1. gRPC protocol buffer definition must be in `/packages/proto/{group}`

  - 1.1.1. In the proto, you need to separate a entity which refer to the object passing between gRPC protocol to the file named `entity.proto`, the message refers to the request-response parameter in `message.proto`, and the procedure call (service) in `service.proto`.
  
    - 1.1.1.1. If working with DateTime. On proto, you must use `uint64` data type and name with suffix `At`, e.g. createdAt, updatedAt.

    - 1.1.1.2. gRPC enum is not allowed because of redundancy.

  - 1.1.2. The message name must be related to a function in the service.
    - e.g. procedure name is **GetWorkspaceById** the request-response message should be **GetWorkspaceByIdRequest** and **GetWorkspaceByIdResponse** (Just add a suffix `Request` or `Response` to the message name).

- 1.2. Add a TypeScript type to refer to the protocol buffer definition in `/packages/shared-internal/src/{group}`

  - 1.2.1. In `entity.ts` and `message.ts`, same as the proto definition that you have created in 1.1. but in TypeScript syntax.

    - 1.2.1.1. If working with DateTime. In the TypeScript type, it must be `number` type.

    - 1.2.1.2. gRPC enum only acceptable in TypeScript type. In the TypeScript enum for referring gRPC definition. You must assign the enum value with a string as same as the enum key.
      ```ts
      export enum Language {
        C = 'C',
        CPP = 'CPP',
      }
      ```

  - 1.2.2. Add `index.ts` to export everything.

- 1.3. Add a TypeScript type to use on the frontend in `/packages/shared-external/src/{group}`. It must be reuse from `shared-internal`.

#### 2. Add database schema with Prisma
  
- 2.1. If you are working with DateTime. You must use `Int` data type with `@db.UnsignedInt`.

- 2.2. Use enum if it possible with the uppercase.

#### 3. Add logical code on API route in the sub-services

- 3.1. We divide the project directory by function. 

  - 3.1.1. In `/services/{group}/src/controllers/*.ts` (excluded gateway group) must contain single service call, incoming data preparation, and response data returning only, e.g.
    ```ts
      @GrpcMethod('AuthService')
      public async authenticate(data: AuthRequest): Promise<AuthResponse> {
        const { session } = data; // Incoming data prepation.
        const user = await this.authService.authenticateOrThrow(session); // Single service call
        return { user }; // Response data returning according to gRPC TypeScript definition type.
      }
    ```

  - 3.1.2. In `/services/{group}/src/services/*.ts` (excluded gateway group) must contain only bussiness logic and data validation.

    - 3.1.2.1. You must create a service method as small as possible for reusability.

    - 3.1.2.2. If the method throw an error, you must add a suffix `OrThrow` in the method signature.
      - You can decide to throw an error if the method has a worst case you expect to let the client know, e.g.
        ```ts
        // Don't forget the method signature suffix.
        public async loginOrThrow(email: string, password: string): Promise<User> {
          const user = await this.userService.getUserWithSelfProvider(email);
          // First worst case.
          if (!user) throw new ExpectedInvalidError(AuthError.InvalidCredentials);

          const isPasswordValid = await bcrypt.compare(password, user.password);
          // Second worst case.
          if (!isPasswordValid) throw new ExpectedInvalidError(AuthError.InvalidCredentials);

          return user;
        }
        ```
      > Keep in mind, you must throw an informative error as possible as you can to improve user-experience and error logging.

    - 3.1.2.3. Service method that return an error must throw and error inherited from `ExpectedError` only and clearly separated by error behaviour, e.g.
      - Throw `ExpectedNotFoundError` if the requested data is not found.
      - Throw `ExpectedInvalidError` if the incoming data is invalid.
      - You can find the variant of error in `/packages/shared-internal/src/error`.
    
      and you must pass an informative error detail to `ExpectedError` constructor which created at `/service/{group}/src/utils/error/*.ts` with the following structure:
      
      ```ts
      export const FooError = {
        Bar: {
          // a = First letter of error section, e.g. UserError = u (u-bbb-ccc).
          // b = 3 digits of number start with 001 to represent a group of error for `error` field.
          // c = A variant of error detail of the error group.
          code: 'a-bbb-ccc',
          error: 'group of error',
          message: 'error message detail',
        },
      };
        
      ```

      In practical example:
      ```ts
      export const UserError = {
        Duplicated: {
          code: 'U-001-001',
          error: 'Duplicated user',
          message: 'This user already registered',
        },
        InvalidEmail: {
          code: 'U-002-001',
          error: 'Invalid user data',
          message: 'Email is invalid',
        },
        PasswordLength: {
          code: 'U-002-002',
          error: 'Invalid user data',
          message: 'Password length must be 8-15 and alphanumeric',
        },
        NotFoundById: {
          code: 'U-003-001',
          error: 'User not found',
          message: 'Cannot retrieve user with this user id',
        },
      };

      ```

    - 3.1.2.4. If service method return an entity data. It must use an entity data type imported from `@prisma/client`.

  - 3.1.3. In `/services/{group}/src/repositories/*.ts` (excluded gateway group) must contain only Prisma service invoking.

    - 3.1.3.1. Method for getting a single data. If a result is not found, you must return `null`.

    - 3.1.3.2. Method for getting a multiple data. If a result is not found, you must return an `empty array`.

    - 3.1.3.3. Use a variant of type provided by generated Prisma client for query condition parameter imported from `Prisma` namespace, e.g.
      ```ts
      public createUser(user: Prisma.UserCreateInput): Promise<User> {
        return this.prismaService.user.create({ data: user });
      }

      public getUsersWhere(where: Prisma.UserWhereInput): Promise<User[]> {
        return this.prismaService.user.findMany({ where });
      }
      ```

    - 3.1.3.4. Multiple repositories are allowed in service but not allowed in a controller.
---

## Frontend
WIP
