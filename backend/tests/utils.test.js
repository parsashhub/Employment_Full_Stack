const { hashPassword } = require("../config/utils");

describe("hashPassword", () => {
  it("should return a hashed password", async () => {
    const hashedPassword = hashPassword("123456");
    expect(hashedPassword).toBeTruthy();
  });
  it("should return an error if password parameter was falsy", async () => {
    await expect(hashPassword(null)).rejects.toThrow("password is not defined");
  });
});
