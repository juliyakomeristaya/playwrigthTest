import { mergeTests } from "@playwright/test";
import { test as userGaragePageFixture } from "./userGaragePage";
import { test as screenSizesFixture } from "./screenSizes";

export const test = mergeTests(userGaragePageFixture, screenSizesFixture);
export { expect } from "@playwright/test";
