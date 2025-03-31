import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAppSelector } from "@/modules/stores";
import { useAppDispatch } from "@/modules/stores";
import { logout } from "@/modules/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const Header = () => {
  const isLoggedIn = useAppSelector((state) => Boolean(state.auth.token));
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 控制菜单是否打开
  const dispatch = useAppDispatch(); // 获取 dispatch
  const navigate = useNavigate(); // 获取 navigate 函数

  const handleAvatarClick = () => {
    setIsMenuOpen(!isMenuOpen); // 切换菜单显示
  };

  const handleLogout = () => {
    dispatch(logout()); // 调用 logout action
    navigate("/"); // 跳转到首页
  };

  return (
    <div>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center px-4">
          <Link
            to={isLoggedIn ? "/dashboard" : "/"}
            className="flex items-center gap-8"
          >
            <img src="/logo.png" alt="edupal logo" className="h-14" />
          </Link>

          {isLoggedIn ? (
            <>
              <nav className="ml-auto flex gap-4 sm:gap-6">
                <Link
                  to="/dashboard"
                  className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4"
                >
                  我的
                </Link>
                <Link
                  to="/question/bank"
                  className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4"
                >
                  题库
                </Link>
              </nav>

              <div className="ml-4 flex items-center gap-2 relative">
                <Avatar
                  className="h-8 w-8 rounded-full cursor-pointer"
                  onClick={handleAvatarClick}
                >
                  <AvatarImage src="https://tongque.ocybers.com/img/logo.jpg" />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                {isMenuOpen && (
                  <div className="absolute top-10 right-0 bg-white border rounded shadow-lg p-2">
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                      注销
                    </Button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="ml-auto flex items-center gap-2">
              <Link to="/auth">
                <Button variant="outline" size="sm" className="font-semibold">
                  登录
                </Button>
              </Link>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
