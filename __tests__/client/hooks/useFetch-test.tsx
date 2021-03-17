import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import React from "react";
import { useFetch } from "../../../src/client/hooks/useFetch";

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 201,
    json: () => Promise.resolve({ test: "test" }),
  })
);

// @ts-ignore
function TestComponent() {
  const { data, loading, error, status } = useFetch("/", {});
  if (loading) return <div>Loading...</div>;
  if (data) {
    // @ts-ignore
    return <div>{data.test}</div>;
  }
  return <>wow</>;
}

it("should render Test", async () => {
  act(() => {
    render(<TestComponent />);
  });
  await screen.findByText("test");
});
