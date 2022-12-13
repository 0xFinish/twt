package controllers

import (
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
