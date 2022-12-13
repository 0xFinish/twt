package database

import (
	"fmt"
	"os"

	_ "github.com/fi9ish/twt/pkg/config"
	"github.com/fi9ish/twt/pkg/models"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

var db *gorm.DB

var (
	host     = os.Getenv("HOST")
	port     = os.Getenv("DBPORT")
	user     = os.Getenv("USER")
	password = os.Getenv("PASSWORD")
	dbname   = os.Getenv("DBNAME")
)

// const (
// 	host     = "localhost"
// 	port     = 5432
// 	user     = "tim"
// 	password = "123"
// 	dbname   = "jwt"
// )

func init() {
	Connect()
	GetDB().AutoMigrate(models.User{})
	GetDB().AutoMigrate(models.Post{})
	GetDB().AutoMigrate(models.Comment{})
}

func Connect() {
	fmt.Println(host, port, user, password, dbname)
	var err error
	psqlInfo := fmt.Sprintf("host=%s port=%s user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	db, err = gorm.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	} else {
		fmt.Println("Connected Successfully")
	}
}

func GetDB() *gorm.DB {
	return db
}
