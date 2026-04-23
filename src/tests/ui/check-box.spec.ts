import { TAGS } from "data/tags";
import { TEST_DATA } from "config/test-data";
import { test } from "../../fixtures/pages.fixture";

test.describe("[UI] [Check-Box] [Smoke]", () => {
  test(
    "should select Classified checkbox and verify result",
    {
      tag: [TAGS.SMOKE, TAGS.UI],
    },
    async ({ checkBoxPage, checkBoxUIService }) => {
      await checkBoxPage.open();
      await checkBoxPage.selectCheckbox(TEST_DATA.CHECKBOX.CLASSIFIED_NAME);

      await checkBoxUIService.verifyCheckResult(TEST_DATA.CHECKBOX.CLASSIFIED_RESULT);
    }
  );
});
