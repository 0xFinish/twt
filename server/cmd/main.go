package main

import (
	"github.com/fi9ish/twt/pkg/controllers"
	middleware "github.com/fi9ish/twt/pkg/middlewares"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.Use(middleware.CORSMiddleware())

	router.GET("/", controllers.Hello())

	router.POST("/login", controllers.Login())

	router.POST("/signup", controllers.Signup())

	router.GET("/auth", middleware.RequireAuth(), controllers.AuthCheck())

	router.GET("/getAllTweets", middleware.RequireAuth(), controllers.GetAllTweets())

	router.POST("/createNewTweet", middleware.RequireAuth(), controllers.CreateNewTweet())

	router.GET("/getUserTweets", middleware.RequireAuth(), controllers.GetUserTweets())

	router.GET("/getUserInfo", middleware.RequireAuth(), controllers.GetUserInfo())

	router.GET("/getTweetById", middleware.RequireAuth(), controllers.GetTweetById())

	router.POST("/commentTweet", middleware.RequireAuth(), controllers.CommentTweet())

	router.GET("/getUserProfileByNickName", middleware.RequireAuth(), controllers.GetUserProfileByNickname())

	router.GET("/GetUserTweetsByNickname", middleware.RequireAuth(), controllers.GetUserTweetsByNickname())

	router.Run()
}
