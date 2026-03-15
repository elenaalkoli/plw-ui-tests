import { TAGS } from "data/tags";
import { test } from "../../fixtures/pages.fixture";
import { generateTextBoxData } from "data/text-box.data";

test.describe("[UI] [Text-Box Form] [Smoke]", () => {
  test(
    "should fill form and verify result",
    {
      tag: [TAGS.SMOKE, TAGS.UI],
    },
    async ({ textBoxPage, textBoxUIService }) => {
      await textBoxPage.open();
      const data = generateTextBoxData();

      await textBoxUIService.fillAndSubmitForm(data);
      await textBoxUIService.verifyFormResult(data);
    }
  );
});
