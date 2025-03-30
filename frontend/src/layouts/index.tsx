import { memo } from "react";
import { useAppSelector } from "@/modules/stores";
import { selectGlobal } from "@/modules/global";
import AppLayout from "@/layouts/components/applayout";
export default memo(() => {
  const globalState = useAppSelector(selectGlobal);

  // 这里的 AppLayout 是一个对象，包含了不同布局的组件
  const AppContainer = AppLayout[globalState.layout];

  return (
    <div className="w-full max-w mx-auto">
      <AppContainer />
    </div>
  );
});
