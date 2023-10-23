import { describe, expect, it } from "@jest/globals";
import { add } from "../../../src/utils/calculator";

describe("Calculator", () => {
   describe("Add", () => {
      it("should return the sum of two numbers", () => {
         const a = 12;
         const b = 10;
         const result = add(a, b);

         expect(result).toBe(22);
      });

      it("should handle negative numbers", () => {
         const a = -12;
         const b = -10;
         const result = add(a, b);

         expect(result).toBe(-22);
      });
   });

   describe("Invalid input", () => {
      it("should throw an error if input is not a number", () => {
         const a: number = 12;
         const b: unknown = "Invalid input";

         expect(() => add(a, b as number)).toThrow("Invalid input. Input must be numbers");
      });
   });
});
