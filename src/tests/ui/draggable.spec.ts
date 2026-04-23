import { TAGS } from "data/tags";
import { test } from "../../fixtures/pages.fixture";

test.describe("[UI] [Draggable] [Regression]", () => {
  test(
    "should drag simple element to new position",
    {
      tag: [TAGS.REGRESSION, TAGS.UI],
    },
    async ({ draggablePage, draggableUIService }) => {
      await draggablePage.open();
      await draggableUIService.verifySimpleDrag();
    }
  );

  test(
    "should drag X-axis restricted element only along X axis",
    {
      tag: [TAGS.REGRESSION, TAGS.UI],
    },
    async ({ draggablePage, draggableUIService }) => {
      await draggablePage.open();
      await draggableUIService.verifyAxisXDrag();
    }
  );

  test(
    "should drag Y-axis restricted element only along Y axis",
    {
      tag: [TAGS.REGRESSION, TAGS.UI],
    },
    async ({ draggablePage, draggableUIService }) => {
      await draggablePage.open();
      await draggableUIService.verifyAxisYDrag();
    }
  );
});
