


import { MockUserRepository } from '../mockUserRepository';
import { User } from '../models/user';

describe('MockUserRepository', () => {
  test('should add a user', async () => {
    const repo = new MockUserRepository();
    const user: User = { name: 'Alice', password: 'secret' };

    const result = await repo.createUser(user);
    expect(result).toEqual(user);
  });

  test('should retrieve a user by username', async () => {
    const repo = new MockUserRepository();
    const user: User = { name: 'Alice', password: 'secret' };
    await repo.createUser(user);

    const found = await repo.getUserByUsername('Alice');
    expect(found).toEqual(user);
  });
});

