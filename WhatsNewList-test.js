import React from "react";
import { render, unmountComponentAtNode }from "react-dom"
import { act } from "react-dom/test-utils";
import WhatsNewList from "../WhatsNewList";
import { jsxEmptyExpression, exportAllDeclaration } from "@babel/types";

import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';

let container = null;

beforeEach(() => {
    //setup DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders album data", async() => {
    const fakeAlbum = {
        title: "A",
        artist: "A",
        label: "A",
        format: "A",
        price: 1,
        image_url: "",
    }
    jest.spyOn(global), "fetch".mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeAlbum)
        })
    );

    await act(async () => {
        render(
          <View>
            <WhatsNewList/>
          </View>
          , container);
    });

    expect(container.querySelector("title").textContent).toBe(fakeAlbum.title);

    global.fetch.mockRestore();
});