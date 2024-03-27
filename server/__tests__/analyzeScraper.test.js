const request = require("supertest");
const app = require("../server"); // Express uygulamasını doğrudan al

describe("POST /analyze", () => {
  it("should analyze website and return data", async () => {
    const response = await request(app)
      .post("/analyze")
      .send({ url: "https://example.com" });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toHaveProperty("technologies");
    expect(response.body).toHaveProperty("pageCount");
  });

  it("should return error for invalid URL", async () => {
    const response = await request(app)
      .post("/analyze")
      .send({ url: "invalid-url" });
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("error");
  });
});
