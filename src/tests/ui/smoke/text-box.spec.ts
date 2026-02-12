import { UI_ROUTES } from "config/ui-routes";
import { test } from "../../../fixtures/pages.fixture";
import { generateTextBoxData } from "data/text-box.data";

test.describe("[UI] [Text-Box Form] [Smoke]", () => {
  test("should fill form and verify result", async ({ textBoxPage, textBoxUIService }) => {
    await textBoxPage.open(UI_ROUTES.TEXT_BOX);
    const data = generateTextBoxData();

    await textBoxUIService.fillAndSubmitForm(data);
    await textBoxUIService.verifyFormResult(data);
  });
});
