import { useEffect } from "react";

import { createDeepCompareEffect } from "../utils/createDeepCompareEffect";

export const useDeepCompareEffect = createDeepCompareEffect(useEffect);
