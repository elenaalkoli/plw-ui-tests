import { test, expect } from "../../fixtures/pages.fixture";
import { generateTextBoxData } from "data/text-box.data";

test.describe("[UI] [Text-Box Form] [Smoke]", () => {
  test("should fill form and verify result", async ({ textBoxUIService }) => {
    const data = generateTextBoxData();
    
    await textBoxUIService.fillAndSubmitForm(data);
    await textBoxUIService.verifyFormResult(data);
  });
});