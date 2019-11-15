import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import CartList from "../CartList";
import { Item } from "react-native/Libraries/Components/Picker/Picker";
import { exportAllDeclaration } from "@babel/types";

let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("changes value when clicked", () => {
    const onChange = jest.fn();
    act(() => {
        render(<CartList onChange={onChange} />, container);
    });

    const quant = document.querySelector("[data-testid=quantity]");
    const minus = document.querySelector("[data-testid=minus]");
    expect(quant).toBe("1");

    act(() => {
        minus.dispatchEvent(new MouseEvent("click",{bubbles: true}));
    });

    expect(quant).toBe("0");



});