import { jest, beforeEach, afterEach, describe, expect, it } from "@jest/globals";
import * as calculator from "../../../src/utils/calculator";

import request from "supertest";

let server;
let numberA;
let numberB;
let calculatorMock;

describe("POST /calculate/add", () => {
   beforeEach(() => {
      server = require("../../../src/index");
      numberA = 20;
      numberB = 22;
      calculatorMock = jest.spyOn(calculator, "add").mockReturnValue(numberA + numberB);
   });

   afterEach(async () => {
      await server.close();
   });

   describe("Happy paths", () => {
      it("should return status code 201", async () => {
         const response = await request(server).post("/calculate/add").send({ a: numberA, b: numberB });
         expect(response.status).toEqual(201);

         expect(calculatorMock).toHaveBeenCalledWith(numberA, numberB);
      });

      it("should return the sum of two numbers", async () => {
         const response = await request(server).post("/calculate/add").send({ a: numberA, b: numberB });
         expect(response.body).toEqual({ result: 42 });

         expect(calculatorMock).toHaveBeenCalledWith(numberA, numberB);
      });
   });
});
