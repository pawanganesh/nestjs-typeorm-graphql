import * as argon from 'argon2';

export class HashHelper {
  private static argon2Options: argon.Options & { raw?: false } = {
    type: argon.argon2id,
    memoryCost: 2 ** 16,
    hashLength: 50,
    timeCost: 4,
  };

  /**
   * Hash a plain string
   * @param password {string}
   * @returns Promise<string> Returns a hashed string
   */
  public static async hash(password: string): Promise<string> {
    return await argon.hash(password, this.argon2Options);
  }

  /**
   * Compare a plain string with a hashed string
   * @param hashed {string}
   * @param plain {string}
   * @returns Promise<boolean> Returns true if the plain string matches the hashed string
   */
  public static async compare(hashed: string, plain: string) {
    return await argon.verify(hashed, plain, this.argon2Options);
  }
}
