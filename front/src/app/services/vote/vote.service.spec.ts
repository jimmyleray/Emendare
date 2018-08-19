import { TestBed, inject } from "@angular/core/testing";

import { VoteService } from "./vote.service";

describe("VoteService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VoteService]
    });
  });

  it("should be created", inject([VoteService], (service: VoteService) => {
    expect(service).toBeTruthy();
  }));
});
