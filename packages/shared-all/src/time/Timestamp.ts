export class Timestamp {

  public static now(): number {
    return Math.floor(Date.now() / 1000);
  }

  public static from(timestamp: number): Date {
    return new Date(timestamp * 1000);
  }

}
