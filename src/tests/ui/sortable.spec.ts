import { TAGS } from "data/tags";
import { test } from "../../fixtures/pages.fixture";

test.describe("[UI] [Sortable] [Regression]", () => {
  test(
    "should drag last list item to first position",
    {
      tag: [TAGS.REGRESSION, TAGS.UI],
    },
    async ({ sortablePage, sortableUIService }) => {
      await sortablePage.open();
      await sortableUIService.verifyListDrag();
    }
  );

  test(
    "should drag last grid item to first position",
    {
      tag: [TAGS.REGRESSION, TAGS.UI],
    },
    async ({ sortablePage, sortableUIService }) => {
      await sortablePage.open();
      await sortableUIService.verifyGridDrag();
    }
  );
});
