import { mount } from "@vue/test-utils";

import App from "@/App.vue";

describe("App.vue", () => {
  test("Happy path", async () => {
    const wrapper = mount(App);

    const nameInput = wrapper.get("#name");
    const weightInput = wrapper.get("#weight");
    const unitSelect = wrapper.get("select");
    const submitButton = wrapper.get('button[type="submit"]');

    expect((submitButton.element as HTMLButtonElement).disabled).toBe(true);
    expect(wrapper.find('[data-test="name-error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="weight-error"]').exists()).toBe(true);

    await nameInput.setValue("Denny Hong");
    await weightInput.setValue(160);
    await unitSelect.setValue("lb");

    expect((submitButton.element as HTMLButtonElement).disabled).toBe(false);
    expect(wrapper.find('[data-test="name-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="weight-error"]').exists()).toBe(false);
  });
});
