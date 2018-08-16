import { AppPage } from "./app.po";

describe("Emendare App", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should display app title", () => {
    page.navigateTo();
    expect(page.getTitle()).toContain("Emendare");
  });
});
