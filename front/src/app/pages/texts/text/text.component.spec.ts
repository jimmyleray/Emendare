import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { TextComponent } from "./text.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("TextComponent", () => {
  let component: TextComponent;
  let fixture: ComponentFixture<TextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it("should create", () => {
  //   expect(component).toBeTruthy();
  // });
});
