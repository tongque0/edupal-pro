import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings, User } from "lucide-react";

const Header = () => {
  const isLoggedIn = true; // Replace with actual authentication logic

  return (
    <div>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center px-4">
          <Link to="/" className="flex items-center gap-8">
            {/* 将edupal替换为图片 */}
            <img src="/logo.png" alt="edupal logo" className="h-14" />
          </Link>

          {isLoggedIn ? (
            <>
              <nav className="ml-auto flex gap-4 sm:gap-6">
                <Link
                  to="/dashboard"
                  className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4"
                >
                  快速入口
                </Link>
                <Link
                  to="/question-bank"
                  className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4"
                >
                  题库
                </Link>
                <Link
                  to="/about"
                  className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4"
                >
                  关于
                </Link>
              </nav>
              <div className="ml-4 flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Button>
              </div>
            </>
          ) : (
            <div className="ml-auto flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" size="sm" className="font-semibold">
                  登录
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="font-semibold">
                  注册
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
