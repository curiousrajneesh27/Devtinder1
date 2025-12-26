import { describe, it, expect } from "@jest/globals";
import { UserModel } from "../src/models/user.model.js";

describe("User Model Tests", () => {
    it("should validate email format", async () => {
        const invalidUser = new UserModel({
            name: "Test User",
            email: "invalid-email",
            password: "Test@1234",
            gender: "male",
            age: 25
        });

        let error;
        try {
            await invalidUser.validate();
        } catch (err) {
            error = err;
        }
        expect(error).toBeDefined();
    });

    it("should require strong password", async () => {
        const weakPasswordUser = new UserModel({
            name: "Test User",
            email: "test@test.com",
            password: "weak",
            gender: "male",
            age: 25
        });

        let error;
        try {
            await weakPasswordUser.validate();
        } catch (err) {
            error = err;
        }
        expect(error).toBeDefined();
    });

    it("should require minimum age of 18", async () => {
        const youngUser = new UserModel({
            name: "Test User",
            email: "test@test.com",
            password: "Test@1234",
            gender: "male",
            age: 16
        });

        let error;
        try {
            await youngUser.validate();
        } catch (err) {
            error = err;
        }
        expect(error).toBeDefined();
    });
});
