package mysql

import (
	"fmt"

	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	DB  *gorm.DB
	err error
)

func Init() {
	DB, err = gorm.Open(mysql.Open("edupal:edupal@tcp(127.0.0.1:3306)/edupal?charset=utf8mb4&parseTime=True&loc=Local"),
		&gorm.Config{
			PrepareStmt:            true,
			SkipDefaultTransaction: true,
		},
	)
	if err != nil {
		panic(err)
	}
	log.Printf("数据库连接成功: %s", fmt.Sprintf("%+v", DB))
}
