package models

import (
	"github.com/jinzhu/gorm"
)

type User struct {
	gorm.Model
	First_name    string  `json:"first_name"`
	Last_name     string  `json:"last_name"`
	Nickname      string  `json:"nick_name" gorm:"unique"`
	Password      string  `json:"password" binding:"required"`
	Email         string  `json:"email" gorm:"unique" binding:"required"`
	Token         string  `json:"token" `
	Refresh_token string  `json:"refresh_token"`
	User_type     string  `json:"user_type"`
	Tweets        []Tweet `json:"posts"`
}

type Tweet struct {
	gorm.Model
	UserID     uint      `json:"user_id"`
	Tweet      string    `json:"tweet"`
	Likes      []Like    `json:"like"`
	Comments   []Comment `json:"comments"`
	LikeAmount uint      `json:"likeAmount"`
}

type Comment struct {
	gorm.Model
	UserID  uint   `json:"user_id"`
	TweetID uint   `json:"tweet_id"`
	Comment string `json:"comment"`
}

type Like struct {
	TweetID uint `json:"tweet_id"`
	UserID  uint `json:"user_id"`
}
