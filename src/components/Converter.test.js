import React from "react";
import ReactDOM from "react-dom";
import Converter from "./Converter";
import Adapter from "enzyme-adapter-react-16";
import { configure, mount } from "enzyme";
import "@testing-library/jest-dom/extend-expect";
configure({ adapter: new Adapter() });
//Core component

describe("Converter Component Test Suit", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Converter />);
  });
  it("should renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Converter />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("should select the original currency", function() {
    let wrapper = mount(<Converter />);
    wrapper
      .find("select")
      .at(0)
      .simulate("change", { target: { value: "US Dollar" } });
    expect(
      wrapper
        .find("select")
        .at(0)
        .props().value
    ).toBe("US Dollar");
  });

  it("should select the exchange currency", function() {
    wrapper
      .find("select")
      .at(1)
      .simulate("change", { target: { value: "Euro" } });
    expect(
      wrapper
        .find("select")
        .at(1)
        .props().value
    ).toBe("Euro");
  });

  it("should verify the button state when app loads", function() {
    expect(wrapper.find("button").prop("disabled")).toBe(true);
  });

  it("should verify button state when user selects currencies to convert", async function() {
    wrapper
      .find("select")
      .at(0)
      .simulate("change", { target: { value: "US Dollar" } });
    wrapper
      .find("select")
      .at(1)
      .simulate("change", { target: { value: "Indian Rupee" } });
    setTimeout(() => {
      expect(wrapper.find("button").prop("disabled")).toBe(false);
    }, 1000);
  });
});
