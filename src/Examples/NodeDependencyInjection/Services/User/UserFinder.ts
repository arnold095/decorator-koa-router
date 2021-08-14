export class UserFinder {
  public async run(): Promise<Record<string, string | number>> {
    return {
      id: 1,
      name: 'test',
    };
  }
}
