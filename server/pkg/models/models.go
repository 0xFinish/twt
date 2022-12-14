package models

import (
	"github.com/jinzhu/gorm"
)

type User struct {
	gorm.Model
	First_name    string  `json:"first_name"`
	Last_name     string  `json:"last_name"`
	Password      string  `json:"password" binding:"required"`
	Email         string  `json:"email" gorm:"unique" binding:"required"`
	Token         string  `json:"token" `
	Refresh_token string  `json:"refresh_token"`
	User_type     string  `json:"user_type"`
	Posts         []Tweet `json:"posts"`
}

type Tweet struct {
	gorm.Model
	UserID   uint      `json:"user_id"`
	Tweet    string    `json:"tweet"`
	Like     uint      `json:"like"`
	Comments []Comment `json:"comments"`
}

type Comment struct {
	gorm.Model
	UserID  uint   `json:"user_id"`
	PostID  Tweet  `json:"post_id"`
	Comment string `json:"comment"`
}
