import { UI_ROUTES } from "config/ui-routes";
import { test, expect } from "../../fixtures/pages.fixture";

test.describe("[UI] [Check-Box] [Smoke]", () => {
  test("should select Classified checkbox and verify result", async ({
    checkBoxPage,
    checkBoxUIService,
  }) => {
    await checkBoxPage.open(UI_ROUTES.CHECKBOX);
    await checkBoxPage.selectCheckbox("Classified");

    await checkBoxUIService.verifyCheckResult("classified");
  });
});
