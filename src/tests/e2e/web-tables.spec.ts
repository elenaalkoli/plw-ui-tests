import { TAGS } from "data/tags";
import { test } from "../../fixtures/pages.fixture";

test.describe("[UI] [Web Tables] [E2E]", () => {
  test(
    "should execute CRUD operations",
    {
      tag: [TAGS.E2E, TAGS.REGRESSION, TAGS.UI],
    },
    async ({ webTablePage, webTableUIService, registrationFormModal }) => {
      await webTablePage.open();

      // 1. create
      const { firstName } = await webTableUIService.fillAndSubmitForm();
      await webTableUIService.verifyUserCreated(firstName);

      // 2. search
      await webTableUIService.searchAndVerifyUser(firstName);
      await webTablePage.clearSearchBox();

      // 3. update
      await webTablePage.clickEditByFirstName(firstName);
      await registrationFormModal.updateSalaryAndDepartment("150000", "Engineering");
      await registrationFormModal.clickSubmit();

      await webTableUIService.verifyUserUpdated(firstName, "150000", "Engineering");

      // 4. delete
      await webTableUIService.deleteRowByFirstName(firstName);

      await webTableUIService.verifyUserNotExists(firstName);
    }
  );
});
