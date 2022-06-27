import { mount, shallowMount } from "@vue/test-utils";
import CoinInput from "@/components/CoinInput.vue";
import coins from "./mocks/coins";

describe("CoinInput is a Vue instane", () => {
  test("is a Vue instance", () => {
    const wrapper = shallowMount(CoinInput, {
      propsData: {
        coins,
        selectedCoin: {
          symbol: "btc",
          amount: 1,
        },
      },
    });
    expect(wrapper.vm).toBeTruthy();
  });
});

describe("CoinInput render props", () => {
  const wrapper = shallowMount(CoinInput, {
    propsData: {
      label: "Test label",
      placeholder: "Test placeholder",
      readonly: true,
      coins,
      selectedCoin: {
        symbol: "btc",
        amount: 1,
      },
    },
  });

  test("Render label", () => {
    const label = wrapper.find(".label");
    expect(label.html()).toContain("Test label");
  });

  test("Render placeholder", () => {
    const placeholder = wrapper.find(".input").attributes("placeholder");
    expect(placeholder).toContain("Test placeholder");
  });

  test("Readonly working", () => {
    const disabled = wrapper.find(".input").attributes("disabled");
    expect(disabled).toBeTruthy();
  });

  test("Render coins options", () => {
    expect(wrapper.find("option:checked").element.value).toEqual("btc");
  });
});

describe("CoinInput updating coin values", () => {
  const wrapper = shallowMount(CoinInput, {
    propsData: {
      label: "Test label",
      placeholder: "Test placeholder",
      readonly: true,
      coins,
      selectedCoin: {
        symbol: "btc",
        amount: 1,
      },
    },
  });

  test("Change select value", async () => {
    const options = wrapper.find("select").findAll("option");
    await options.at(1).setSelected();
    expect(wrapper.find("option:checked").element.value).toEqual("eth");
    await options.at(4).setSelected();
    expect(wrapper.find("option:checked").element.value).toEqual("matic");
  });

  test("Change input amount", async () => {
    const inputValue = wrapper.find("input[type='number']");
    expect(inputValue.element.value).toBe("1");
    await inputValue.setValue("7");
    expect(inputValue.element.value).toBe("7");
  });

  test("update selectedCoin symbol", async () => {
    const options = wrapper.find("select").findAll("option");
    expect(wrapper.vm.$props.selectedCoin.symbol).toBe("matic");
    await options.at(1).setSelected();
    expect(wrapper.vm.$props.selectedCoin.symbol).toBe("eth");
  });
});
