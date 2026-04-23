import { TAGS } from "data/tags";
import { TEST_DATA } from "config/test-data";
import { test } from "../../fixtures/pages.fixture";

test.describe("[UI] [Browser Windows] [Smoke]", () => {
  test(
    "should open new tab and verify heading text",
    {
      tag: [TAGS.SMOKE, TAGS.UI],
    },
    async ({ browserWindowsPage, browserWindowsUIService }) => {
      await browserWindowsPage.open();
      await browserWindowsUIService.verifyNewTabText(TEST_DATA.BROWSER_WINDOWS.SAMPLE_HEADING);
    }
  );

  test(
    "should open new window and verify heading text",
    {
      tag: [TAGS.SMOKE, TAGS.UI],
    },
    async ({ browserWindowsPage, browserWindowsUIService }) => {
      await browserWindowsPage.open();
      await browserWindowsUIService.verifyNewWindowText(TEST_DATA.BROWSER_WINDOWS.SAMPLE_HEADING);
    }
  );
});
