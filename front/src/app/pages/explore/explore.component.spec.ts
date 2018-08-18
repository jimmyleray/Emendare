import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ExploreComponent } from "./explore.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("ExploreComponent", () => {
  let component: ExploreComponent;
  let fixture: ComponentFixture<ExploreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExploreComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
