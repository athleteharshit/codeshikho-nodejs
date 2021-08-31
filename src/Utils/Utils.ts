export class Utils {
  public maxTokenTime: number = 600000;

  static generateVerificationToken(size: number = 5): number {
    const digest = "0123456789";
    let otp = "";
    for (let i = 0; i < size; i++) {
      otp += digest[Math.floor(Math.random() * 10)];
    }
    return parseInt(otp);
  }
}
