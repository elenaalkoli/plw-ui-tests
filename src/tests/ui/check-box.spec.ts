import { UI_ROUTES } from "config/ui-routes";
import { test, expect } from "../../fixtures/pages.fixture";

test.describe("[UI] [Check-Box] [Smoke]", () => {
  test("select Classified checkbox and verify result", async ({ checkBoxPage }) => {
    await checkBoxPage.open(UI_ROUTES.CHECKBOX);
    await checkBoxPage.waitForOpened();

    await checkBoxPage.selectCheckbox("Classified");
    await checkBoxPage.verifyCheckResult("classified");
  });
});
