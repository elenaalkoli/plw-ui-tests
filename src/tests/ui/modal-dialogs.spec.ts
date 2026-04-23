import { TAGS } from "data/tags";
import { TEST_DATA } from "config/test-data";
import { test } from "../../fixtures/pages.fixture";

test.describe("[UI] [Modal Dialogs] [Smoke]", () => {
  test(
    "should open small modal and verify title and content",
    {
      tag: [TAGS.SMOKE, TAGS.UI],
    },
    async ({ modalDialogsPage, modalDialogsUIService }) => {
      await modalDialogsPage.open();
      await modalDialogsUIService.verifySmallModal(TEST_DATA.MODAL_DIALOGS.SMALL_MODAL_TITLE, TEST_DATA.MODAL_DIALOGS.SMALL_MODAL_BODY_FRAGMENT);
    }
  );

  test(
    "should open large modal and verify title",
    {
      tag: [TAGS.SMOKE, TAGS.UI],
    },
    async ({ modalDialogsPage, modalDialogsUIService }) => {
      await modalDialogsPage.open();
      await modalDialogsUIService.verifyLargeModal(TEST_DATA.MODAL_DIALOGS.LARGE_MODAL_TITLE);
    }
  );
});
