import { test } from "../../../fixtures/pages.fixture";

test.describe("[UI] [Web Tables] [E2E]", () => {
  test("should execute CRUD operations", async ({
    webTablePage,
    webTableUIService,
    registrationFormModal,
  }) => {
    await webTablePage.open();

    // 1. create
    const userData = await webTableUIService.fillAndSubmitForm();
    await webTableUIService.verifyUserCreated(userData.firstName);

    // 2. seacrh
    await webTableUIService.searchAndVerifyUser(userData.firstName);
    await webTablePage.clearSearchBox();

    // 3. update
    const rowIndex = await webTablePage.getRowIndexByFirstName(userData.firstName);
    await webTablePage.clickEdit(rowIndex);
    await registrationFormModal.updateSalaryAndDepartment("150000", "Engineering");
    await registrationFormModal.clickSubmit();

    await webTableUIService.verifyUserUpdated(rowIndex, "150000", "Engineering");

    // 4. delete
    await webTablePage.clearSearchBox();
    const deleteRowIndex = await webTablePage.getRowIndexByFirstName(userData.firstName);
    await webTablePage.deleteRowByIndex(deleteRowIndex);

    await webTableUIService.verifyUserNotExists(userData.firstName);
  });
});
