package controllers

import (
	"fmt"
	"net/http"
	"time"

	"github.com/fi9ish/twt/pkg/database"
	"github.com/fi9ish/twt/pkg/models"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

func Signup() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var body models.User
		if err := ctx.BindJSON(&body); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"error": "Failed to read body",
			})
			return
		}

		if body.First_name == "" || body.Last_name == "" {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"error": "You didn't give first or last name",
			})
			return
		}
		hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)

		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"error": "Failed to generate hast password",
			})
			return
		}

		body.Password = string(hash)

		result := database.GetDB().Create(&body)

		if result.Error != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"error": "Failed to create user",
			})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{
			"message": "we are good!",
		})

	}
}

func Login() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var body models.User
		if err := ctx.BindJSON(&body); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"error": "Failed to read body",
			})
			return
		}
		var user models.User
		database.GetDB().First(&user, "email = ?", body.Email)

		if user.ID == 0 {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"error": "Invalid email or password",
			})
			return
		}

		err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))

		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"error": "Invalid email or password",
			})
			return
		}

		timeClaim := time.Now().Add(time.Hour).Unix()
		fmt.Println("TIMECLAIM")
		fmt.Println(timeClaim)

		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"sub": user.ID,
			"exp": timeClaim,
		})

		tokenString, err := token.SignedString([]byte("f2w8e3urw890ruiosadjfaklsf"))

		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"error": "Invalid failed to create token",
			})
			return
		}

		result := database.GetDB().Model(&models.User{}).Where("email = ?", user.Email).Update("token", tokenString)

		if result.Error != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"error": "Failed to update DB",
			})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{
			"accessToken": tokenString,
		})
	}
}

func Validate() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"message": "I'm logged in",
		})
	}
}
