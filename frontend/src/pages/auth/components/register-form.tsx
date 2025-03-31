import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "@/api/user";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
interface RegisterFormProps {
  toggleForm: () => void; // 接收 toggleForm 函数作为 props
  className?: string; // 可选的 className 属性
  [key: string]: any; // 其他任意属性
}
export function RegisterForm({ toggleForm, className, ...props }: RegisterFormProps) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // 使用 useNavigate 进行页面跳转
  // 提交表单时的处理函数
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 调用注册 API

    try {
      const res = await register({
        email,
        username,
        password,
      });
      if (res.username === username) {
        toast.success("注册成功，请登录！");
        toggleForm(); // 切换到登录表单
      }
    } catch (error) {
      toast.error("注册失败，请检查您的信息");
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">创建您的账户</h1>
        <p className="text-balance text-sm text-muted-foreground">
          输入您的详细信息以创建新账户
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">邮箱</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email} // 绑定 value 到 state
            onChange={(e) => setEmail(e.target.value)} // 更新 email state
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="username">用户名</Label>
          <Input
            id="username"
            type="text"
            placeholder="您的用户名"
            required
            value={username} // 绑定 value 到 state
            onChange={(e) => setUsername(e.target.value)} // 更新 username state
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">密码</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              忘记密码？
            </a>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password} // 绑定 value 到 state
            onChange={(e) => setPassword(e.target.value)} // 更新 password state
          />
        </div>
        <Button type="submit" className="w-full">
          注册
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            或继续使用
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor"
            />
          </svg>
          使用 GitHub 注册
        </Button>
      </div>
    </form>
  );
}
