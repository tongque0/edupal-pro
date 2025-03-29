import React, { memo } from "react";
import { TopLayout } from "./components/applayout";

export default memo(() => {
  return (
    <div className="w-full max-w mx-auto">
      <TopLayout />
    </div>
  );
});
