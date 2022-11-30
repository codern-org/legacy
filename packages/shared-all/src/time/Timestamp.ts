export class Timestamp {

  public static now(): number {
    return Math.floor(Date.now() / 1000);
  }

}
