import { test } from "../../../fixtures/pages.fixture";

test.describe("[UI] [Web Tables] [E2E]", () => {
  test("should execute CRUD operations", async ({
    webTablePage,
    webTableUIService,
    registrationFormModal,
  }) => {
    await webTablePage.open();

    // 1. create
    const { firstName } = await webTableUIService.fillAndSubmitForm();
    await webTableUIService.verifyUserCreated(firstName);

    // 2. seacrh
    await webTableUIService.searchAndVerifyUser(firstName);
    await webTablePage.clearSearchBox();

    // 3. update
    const rowIndex = await webTablePage.getRowIndexByFirstName(firstName);
    await webTablePage.clickEdit(rowIndex);
    await registrationFormModal.updateSalaryAndDepartment("150000", "Engineering");
    await registrationFormModal.clickSubmit();

    await webTableUIService.verifyUserUpdated(firstName, "150000", "Engineering");

    // 4. delete
    await webTableUIService.deleteRowByFirstName(firstName);

    await webTableUIService.verifyUserNotExists(firstName);
  });
});
