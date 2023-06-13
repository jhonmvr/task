import { faker } from '@faker-js/faker';
import { User } from '../../src/models';

export function generateUserData(overide = {}) {
  return {
    id: faker.number.int(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateUsersData(n: number = 1) {
  return Array.from({
    length: n
  }, (_, i) => {
    return generateUserData()
  });
}

export function generateUserPayload() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }
}

export function generatePostData(overide = {}) {
  return {
    id: faker.number.int(),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),
    userId: faker.number.int(),
    comments: [],
    user: new User(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generatePostsData(n: number = 1, overide = {}) {
  return Array.from({
    length: n
  }, (_, i) => {
    return generatePostData(overide)
  });
}

export function generatePostPayload() {
  return {
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),
    userId: faker.number.int(),
  }
}



export function generateCommentPayload() {
  return {
    content: faker.lorem.paragraph(),
    userId: faker.number.int(),
    postId: faker.number.int(),
  }
}
