const bcrypt = require("bcryptjs");
const crypto = require("crypto");

class Encryption {
  static async hashPassword(password) {
    return await bcrypt.hash(password, 12);
  }

  static async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  static generateRandomToken() {
    return crypto.randomBytes(40).toString("hex");
  }

  static createHash(string) {
    return crypto.createHash("sha256").update(string).digest("hex");
  }
}

module.exports = Encryption;
