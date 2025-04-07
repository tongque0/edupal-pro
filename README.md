# Edupal · AI 题目生成与智能刷题平台

 本项目是我的本科毕业设计，旨在打造一个基于大语言模型（LLM）的智能刷题平台，支持题目生成、智能批阅、在线练习和一键组卷，预计应用前景为帮助学生更好的学习（仅预计）。

>  在线演示：[edupal.ocybers.com](http://edupal.ocybers.com)

## ✨ 项目亮点

-  **AI 题目生成**：支持按年级、学科、题型、难度等维度生成题目
-  **一键组卷**：根据知识点和难度智能组合题目生成试卷
-  **AI 判题与解析**：自动判题与生成题目解析（支持客观题）
-  **在线测评与分析**：统计学生做题数据、识别薄弱知识点
-  **内置RBAC**：教支持自定义角色，层次化权限管理

## 技术架构

| 层级 | 技术 |
|------|------|
| 前端 | React + Tailwind CSS + shadcn/ui |
| 后端 | FastAPI（Python） |
| 中间件 | RabbitMQ、MySQL 8.0、Agent（Golang） |
| 容器化 | Docker + Docker Compose |
| 说明 | 我们不被允许使用golang来完成毕设，故是python版本 |

## 📽️ 演示视频

[点击查看视频](https://github.com/user-attachments/assets/7b8424c8-80ba-489a-b654-25db646f3c1b)

## ⚙️ 快速开始

你可以选择以下两种方式来启动项目：

### 开发模式（本地开发）

```bash
make dev
```

- 启动 Docker 容器，自动挂载代码到容器中


### 生产部署（一键运行）

```bash
make prod
```

- 使用 Docker Compose 一键部署服务

> ⚠ 若未正确配置 dockercompose环境变量 ，部分功能（如生成题目 / 判题）将不可用。

## 声明

本项目中存在第三方apikey，我并未隐藏，因为并没有充值多少，如果需要使用，请使用自己的key，且演示站皆使用默认环境，请勿随意渗透。

## 开源协议

本项目仅供学习与展示使用，具体协议请查看 [LICENSE](./LICENSE) 文件。

