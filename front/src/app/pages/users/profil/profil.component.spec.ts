import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ProfilComponent } from "./profil.component";

describe("ProfilComponent", () => {
  let component: ProfilComponent;
  let fixture: ComponentFixture<ProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it("should create", () => {
  //   expect(component).toBeTruthy();
  // });
});
