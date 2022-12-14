package controllers

import (
	"net/http"

	"github.com/fi9ish/twt/pkg/database"
	"github.com/fi9ish/twt/pkg/models"
	"github.com/gin-gonic/gin"
)

func Hello() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{"ping": "pong"})
	}
}

func AuthCheck() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{
			"message": "I am authorized",
		})
	}
}

func CreateNewTweet() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var Tweet models.Tweet
		err := ctx.BindJSON(&Tweet)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"error": "Could not bind received JSON",
			})
			return
		}
		middlewareUser, exists := ctx.Get("user")
		if !exists {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"error": "The middlware can't parse the user key/value pair",
			})
			return
		}
		User, ok := middlewareUser.(models.User)
		if !ok {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"error": "The middlware user does not contain models.User",
			})
			return
		}
		Tweet.UserID = User.ID
		result := database.GetDB().Model(&Tweet).Create(Tweet)
		if result.Error != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"error": "Failed inserting Tweet into db",
			})
			return
		}
	}
}
