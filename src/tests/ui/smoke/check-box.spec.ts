import { test } from "../../../fixtures/pages.fixture";

test.describe("[UI] [Check-Box] [Smoke]", () => {
  test("should select Classified checkbox and verify result", async ({
    checkBoxPage,
    checkBoxUIService,
  }) => {
    await checkBoxPage.open();
    await checkBoxPage.selectCheckbox("Classified");

    await checkBoxUIService.verifyCheckResult("classified");
  });
});
