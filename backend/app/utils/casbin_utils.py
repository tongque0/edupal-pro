import casbin
from casbin import persist
from casbin import util
import os

# 全局enforcer实例
_enforcer = None

def init_enforcer():
    """初始化Casbin enforcer实例"""
    global _enforcer

    # 使用Casbin的RBAC模型，并且不依赖外部文件
    # 创建临时模型文件
    model_text = """
    [request_definition]
    r = sub, obj, act

    [policy_definition]
    p = sub, obj, act

    [role_definition]
    g = _, _

    [policy_effect]
    e = some(where (p.eft == allow))

    [matchers]
    m = g(r.sub, p.sub) && (r.obj == p.obj || keyMatch(r.obj, p.obj)) && (r.act == p.act || p.act == "*")
    """

    # 创建临时文件来存储模型
    model_path = "temp_model.conf"
    with open(model_path, "w") as f:
        f.write(model_text)

    # 使用文件路径创建Enforcer
    _enforcer = casbin.Enforcer(model_path)

    # 创建完成后删除临时文件
    os.remove(model_path)

    # 定义角色
    _enforcer.add_role_for_user("user", "default")       # user 角色继承 default 角色权限
    _enforcer.add_role_for_user("admin", "user")         # admin 角色继承 user 角色权限
    _enforcer.add_role_for_user("superadmin", "admin")   # superadmin 角色继承 admin 角色权限

    # 添加公共访问权限（不需要登录）
    _enforcer.add_policy("*", "/ping", "GET")
    _enforcer.add_policy("*", "/user/login", "POST")
    _enforcer.add_policy("*", "/user/register", "POST")
    _enforcer.add_policy("*", "/docs", "GET")
    _enforcer.add_policy("*", "/openapi.json", "GET")

    # default 角色权限 (登录后即具有的基本权限)
    _enforcer.add_policy("default", "/user/me", "GET")
    _enforcer.add_policy("default", "/user/me", "PUT")
    _enforcer.add_policy("default", "/question/gen", "POST")
    _enforcer.add_policy("default", "/question/get", "GET")
    _enforcer.add_policy("default", "/question/trace/*", "GET")
    _enforcer.add_policy("default", "/question/new", "POST")
    _enforcer.add_policy("default", "/question/update/*", "PUT")
    _enforcer.add_policy("default", "/question/delete/*", "DELETE")
    _enforcer.add_policy("default", "/question/delete_batch", "DELETE")


    # user 角色权限 (普通用户权限)
    _enforcer.add_policy("user", "/courses/*/enroll", "POST")

    # admin 角色权限 (管理员权限)
    _enforcer.add_policy("admin", "/courses", "POST")


    # superadmin 角色权限 (超级管理员权限)
    _enforcer.add_policy("superadmin", "/user/*", "*")    # 可以访问所有管理接口
    _enforcer.add_policy("superadmin", "/system/*", "*")   # 系统设置权限

    return _enforcer

def get_enforcer():
    """获取全局Casbin enforcer实例"""
    global _enforcer
    if _enforcer is None:
        _enforcer = init_enforcer()
    return _enforcer
