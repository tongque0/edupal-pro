package mysql

import (
	"agent/dal/model"
	"fmt"
	"log"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	DB  *gorm.DB
	err error
)

func Init() {
	// 读取 DATABASE_URL 环境变量
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		// 默认连接本地 MySQL
		dsn = "edupal:edupal@tcp(127.0.0.1:3306)/edupal?charset=utf8mb4&parseTime=True&loc=Local"
		log.Println("未设置环境变量 DATABASE_URL，使用默认本地连接字符串")
	}

	// 初始化数据库连接
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{
		PrepareStmt:            true,
		SkipDefaultTransaction: true,
	})
	if err != nil {
		panic(fmt.Sprintf("数据库连接失败: %v", err))
	}

	log.Printf("数据库连接成功: %s", dsn)

	var count int64
	DB.Model(&model.Question{}).Count(&count)

	if count <= 1 {
		log.Println("Question 表记录数小于等于1，插入初始化数据...")
		insertInitialQuestions()
		DB.Model(&model.Question{}).Count(&count)
		if count > 1 {
			log.Println("初始化数据插入成功", count)
		} else {
			log.Println("初始化数据插入失败")
		}
	}
}
