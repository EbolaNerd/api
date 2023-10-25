import { jest, beforeEach, afterEach, describe, expect, it } from "@jest/globals";
import * as calculator from "../../../src/utils/calculator";

import request from "supertest";

let server;
let name;
let phone;
let age;

let calculatorMock;

const exec = () => {
   return request(server).post("/api/users").send({ name, phone, age });
};

describe("POST /users", () => {
   beforeEach(() => {
      server = require("../../../src/index");
      name = "Lars Wolter";
      phone = 12345678;
      age = 22;
      calculatorMock = jest.spyOn(calculator, "validateAge").mockReturnValue(true);
   });

   afterEach(async () => {
      calculatorMock.mockClear();
      await server.close();
   });

   describe("Create user", () => {
      it("should return status code 201", async () => {
         const response = await exec();
         expect(response.status).toEqual(201);

         expect(calculatorMock).toHaveBeenCalledWith(age);
      });

      it("should return the created user", async () => {
         const response = await exec();
         expect(response.body).toHaveProperty("id");
         expect(response.body).toHaveProperty("name", name);
         expect(response.body).toHaveProperty("phone", phone);
         expect(response.body).toHaveProperty("age", age);

         expect(calculatorMock).toHaveBeenCalledWith(age);
      });

      it("should return status code 401 if age is under 18", async () => {
         age = 17;
         calculatorMock = jest.spyOn(calculator, "validateAge").mockReturnValue(false);
         const response = await exec();

         expect(response.status).toEqual(401);
         expect(calculatorMock).toHaveBeenCalledWith(age);
      });

      it("should return an error message if age is under 18", async () => {
         age = 17;
         calculatorMock = jest.spyOn(calculator, "validateAge").mockReturnValue(false);
         const response = await exec();

         expect(response.text).toEqual("User must be of age 18 or above");
         expect(calculatorMock).toHaveBeenCalledWith(age);
      });
   });

   describe("Invalid input", () => {
      it("should return 401 if name is not provided", async () => {
         name = "";
         const response = await exec();
         expect(response.statusCode).toBe(401);

         expect(calculatorMock).toHaveBeenCalledTimes(0);
      });

      it("should return an error message if name is not provided", async () => {
         name = "";
         const response = await exec();
         expect(response.text).toBe("Please provide name");

         expect(calculatorMock).toHaveBeenCalledTimes(0);
      });

      it("should return 401 if phone is not provided", async () => {
         phone = "";
         const response = await exec();
         expect(response.statusCode).toBe(401);

         expect(calculatorMock).toHaveBeenCalledTimes(0);
      });

      it("should return an error message if phone is not provided", async () => {
         phone = "";
         const response = await exec();
         expect(response.text).toBe("Please provide phone number");

         expect(calculatorMock).toHaveBeenCalledTimes(0);
      });

      it("should return 401 if age is not provided", async () => {
         age = "";
         const response = await exec();
         expect(response.statusCode).toBe(401);

         expect(calculatorMock).toHaveBeenCalledTimes(0);
      });

      it("should return an error message if age is not provided", async () => {
         age = "";
         const response = await exec();
         expect(response.text).toBe("Please provide age");

         expect(calculatorMock).toHaveBeenCalledTimes(0);
      });
   });
});
