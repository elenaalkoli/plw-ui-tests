import { DemoqaPage } from "./demoqa.page";

export class TextBoxPage extends DemoqaPage {
    readonly title = this.page.locator("h1.text-center");
    readonly uniqueElement = this.title;
}