import Mock from "mockjs";
import { MockParams } from "./typing";
import table from "./table";
import "./data"
const mocks = [...table];
const IsMock = false;
//设置延时时间
Mock.setup({
  timeout: "300",
});
//数据模板文档   http://mockjs.com/examples.html

export function mockXHR() {
  if (!IsMock) {
    return;
  }
  let i: MockParams;
  for (i of mocks) {
    if (i.IsMock) {
      Mock.mock(new RegExp(i.url), i.type || "get", () => {
        return {
          code: 0,
          data: Mock.mock(i.data)
        };
      });
    }
  }
}