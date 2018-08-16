import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { SettingsMenuComponent } from "./settings-menu.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("SettingsMenuComponent", () => {
  let component: SettingsMenuComponent;
  let fixture: ComponentFixture<SettingsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsMenuComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it("should create", () => {
  //   expect(component).toBeTruthy();
  // });
});
