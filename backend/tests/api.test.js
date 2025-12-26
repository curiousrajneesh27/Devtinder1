import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import request from "supertest";
import { app, server } from "../src/app.js";
import { connectDB } from "../src/utils/mongodb.js";

describe("API Tests", () => {
    beforeAll(async () => {
        await connectDB();
    });

    afterAll(async () => {
        server.close();
    });

    describe("Health Check", () => {
        it("should return 200 OK", async () => {
            const response = await request(app).get("/api/v1/health");
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });
    });

    describe("Auth Routes", () => {
        it("should fail login with invalid credentials", async () => {
            const response = await request(app).post("/api/v1/auth/login").send({
                email: "invalid@test.com",
                password: "wrongpassword"
            });
            expect(response.status).toBe(400);
        });

        it("should require all fields for signup", async () => {
            const response = await request(app).post("/api/v1/auth/signup").send({
                email: "test@test.com"
            });
            expect(response.status).toBe(400);
        });
    });

    describe("User Routes", () => {
        it("should require authentication for feed", async () => {
            const response = await request(app).get("/api/v1/user/feed");
            expect(response.status).toBe(401);
        });

        it("should require authentication for connections", async () => {
            const response = await request(app).get("/api/v1/user/connections");
            expect(response.status).toBe(401);
        });
    });

    describe("File Upload", () => {
        it("should require authentication for file upload", async () => {
            const response = await request(app).post("/api/v1/file/upload");
            expect(response.status).toBe(401);
        });
    });
});
