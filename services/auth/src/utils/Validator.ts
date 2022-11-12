export class Validator {

  public static validateEmail(email: string): boolean {
    // eslint-disable-next-line no-useless-escape
    const tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    const parts = email.split('@');
    if (parts.length !== 2) return false;

    const account = parts[0];
    const address = parts[1];

    if ((account.length > 64) || (address.length > 255)) return false;

    const domainParts = address.split('.');
    if (domainParts.some((part) => (part.length > 63))) return false;

    if (!tester.test(email)) return false;

    return true;
  }

}
