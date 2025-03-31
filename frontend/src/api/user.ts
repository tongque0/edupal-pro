import request from "@/utils/request";


// 注册请求
export const register = async (params: { email:string,username: string; password: string }) => {
  const { username, password } = params;
  try {
    const res = await request.post("/user/signup", {
      email: params.email,
      username,
      password,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

