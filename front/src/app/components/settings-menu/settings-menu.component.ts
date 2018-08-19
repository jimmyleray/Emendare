import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { appAvailableLangs } from "src/app/config";

/**
 * Settings menu on main navbar of application
 */
@Component({
  selector: "app-settings-menu",
  templateUrl: "./settings-menu.component.html",
  styleUrls: ["./settings-menu.component.scss"]
})
export class SettingsMenuComponent implements OnInit {
  /**
   * List of application available languages
   */
  public availableLangs = appAvailableLangs;

  /**
   * @constructor Constructor function
   * @param translate Translation service
   */
  constructor(public translate: TranslateService) {}

  /**
   * On init hook to setup the translate service
   */
  ngOnInit(): void {
    // add all available languages
    this.translate.addLangs(this.availableLangs.map(lang => lang.id));

    // this language will be used as a fallback when
    // a translation isn't found in the current language
    this.translate.setDefaultLang(
      this.availableLangs.find(lang => lang.default).id
    );

    // the lang to use, if the lang isn't available,
    // it will use the current loader to get them
    this.translate.use(this.translate.getBrowserLang());
  }
}
