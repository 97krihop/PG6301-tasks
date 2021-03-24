import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import React from "react";
import { useFetch } from "../../../src/client/lib/useFetch";

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 201,
    json: () => Promise.resolve({ test: "test" }),
  })
);

const TestComponent = () => {
  const { data, loading, error, status } = useFetch("/", {});
  if (loading) return <div>Loading...</div>;
  // @ts-ignore
  if (data) return <div>{data.test}</div>;
  return <></>;
};

it("should render Test", async () => {
  act(() => {
    render(<TestComponent />);
  });
  await screen.findByText("test");
});
