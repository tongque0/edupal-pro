.PHONY: dev prod down clean add gendal
# Docker
# 启动开发环境
dev:
	docker-compose -f docker-compose.dev.yml up --build

# 启动生产环境，先执行 clean
prod: clean
	docker-compose -f docker-compose.yml up --build

# 停止开发环境
down:
	docker-compose -f docker-compose.dev.yml down

# 清理所有容器和卷, --rmi all 删除所有镜像
clean:
	docker-compose -f docker-compose.dev.yml down -v --remove-orphans
	docker-compose -f docker-compose.dev.yml down --rmi all
	docker-compose -f docker-compose.yml down -v --remove-orphans
	docker-compose -f docker-compose.yml down --rmi all

# 前端
# 执行 pnpm dlx shadcn@canary add 命令
# $(filter-out $@,$(MAKECMDGOALS)) 过滤掉 "add"，只保留后面的参数
# 例如：make add button 会变成 pnpm dlx shadcn@latest add button
add:
	@cd frontend && pnpm dlx shadcn@latest add $(filter-out $@,$(MAKECMDGOALS))
# 捕获所有未定义的目标，避免 make 误报错误
%:
	@:

gendal:
	cwgo  model --db_type mysql --dsn "edupal:edupal@tcp(localhost:3306)/edupal?charset=utf8&parseTime=True&loc=Local"  --out_dir "agent/dal/query" --type_tag --tables "question" --tables "questiontrace"
