import { TestBed, inject } from "@angular/core/testing";
import { AuthenticationGuard } from "./authentication.guard";

describe("AuthenticationGuard", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationGuard]
    });
  });

  // it("should create a guard", inject(
  //   [AuthenticationGuard],
  //   (guard: AuthenticationGuard) => {
  //     expect(guard).toBeTruthy();
  //   }
  // ));
});
