package models

import (
	"github.com/jinzhu/gorm"
)

type User struct {
	gorm.Model
	First_name    string `json:"first_name"`
	Last_name     string `json:"last_name"`
	Password      string `json:"password" binding:"required"`
	Email         string `json:"email" gorm:"unique" binding:"required"`
	Token         string `json:"token" `
	Refresh_token string `json:"refresh_token"`
	User_type     string `json:"user_type"`
}

type Post struct {
	gorm.Model
	User  User   `json:"user"`
	Tweet string `json:"tweet"`
	Like  int    `json:"like"`
}

type Comment struct {
	gorm.Model
	Post    Post   `json:"post"`
	Comment string `json:"comment"`
}
