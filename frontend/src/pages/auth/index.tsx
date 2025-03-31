import { LoginForm } from "@/pages/auth/components/login-form";
import { RegisterForm } from "@/pages/auth/components/register-form"; // 引入 RegisterForm 组件
import { switchLayout } from "@/modules/global";
import { Layout } from "@/modules/global";
import { useAppDispatch } from "@/modules/stores";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AuthPage() {
  const dispatch = useAppDispatch();
  const [isLoginPage, setIsLoginPage] = useState(true); // 默认渲染登录表单

  useEffect(() => {
    dispatch(switchLayout(Layout.full));
    return () => {
      dispatch(switchLayout(Layout.top)); // 恢复为顶部布局
    };
  }, [dispatch]);

  // 切换登录与注册表单的函数
  const toggleForm = () => {
    setIsLoginPage(!isLoginPage);
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-8">
            {/* 将edupal替换为图片 */}
            <img src="/logo.png" alt="edupal logo" className="h-14" />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {isLoginPage ? (
              <LoginForm /> // 渲染登录表单
            ) : (
              <RegisterForm toggleForm={toggleForm} /> // 渲染注册表单
            )}
          </div>
        </div>
        <div className="text-center text-sm">
          {isLoginPage ? (
            <>
              没有账号？{" "}
              <button
                onClick={toggleForm}
                className="underline underline-offset-4"
              >
                注册
              </button>
            </>
          ) : (
            <>
              已有账号？{" "}
              <button
                onClick={toggleForm}
                className="underline underline-offset-4"
              >
                登录
              </button>
            </>
          )}
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="Https://api.kdcc.cn"
          alt="图片"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
