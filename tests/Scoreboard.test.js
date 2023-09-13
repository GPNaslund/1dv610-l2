import Scoreboard from "../Scoreboard";

describe("Scoreboard class", () => {
  describe("constructor", () => {
    it("should initiate succesfully with correct argument", () => {
      expect(new Scoreboard("Tester")).toBeDefined();
    });
    it("should initiate succesully with points argument also", () => {
      const scoreboard = new Scoreboard("Tester", 10);
      expect(scoreboard).toBeDefined();
      expect(scoreboard.playerName).toBe("Tester");
      expect(scoreboard.score).toBe(10);
    });
    it("should throw error with invalid arguments", () => {
      expect(() => new Scoreboard(1).toThrow(TypeError));
      expect(() => new Scoreboard(["1"]).toThrow(TypeError));
      expect(() => new Scoreboard("Tester", "123")).toThrow(TypeError);
    })
  });
  describe("addPoints()", () => {
    const scoreboard = new Scoreboard("Tester");
    it("should successfully add points to score", () => {
      scoreboard.addPoints(1);
      expect(scoreboard.score).toBe(1);
    });
    it("should throw error with invalid arguments", () => {
      expect(() => scoreboard.addPoints("Not a number").toThrow(TypeError));
      expect(() => scoreboard.addPoints("[Not a number]").toThrow(TypeError));
      expect(() => scoreboard.addPoints(-10).toThrow(TypeError));
    })
  });
  describe("deductPoints()", () => {
    const scoreboard = new Scoreboard("Tester");
    it("should successfully deduct points from the score", () => {
      scoreboard.addPoints(10);
      scoreboard.deductPoints(5);
      expect(scoreboard.score).toBe(5);
    });
    it("should throw error with invalid arguments", () => {
      expect(() => scoreboard.deductPoints("Not a number").toThrow(TypeError));
      expect(() => scoreboard.deductPoints("[Not a number]").toThrow(TypeError));
      expect(() => scoreboard.deductPoints(-10).toThrow(TypeError));
    });
  });
  describe("reset()", () => {
    it("should reset the score to 0", () => {
      const scoreboard = new Scoreboard("Tester");
      scoreboard.addPoints(1);
      expect(scoreboard.score).toBe(1);
      scoreboard.reset();
      expect(scoreboard.score).toBe(0);
    })
  })
})