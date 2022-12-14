package middleware

import (
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/fi9ish/twt/pkg/database"
	"github.com/fi9ish/twt/pkg/models"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

func RequireAuth() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		tokenString, err := getToken(ctx)

		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Can't get token"})
			return
		}

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			// Don't forget to validate the alg is what you expect:
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}

			// hmacSampleSecret is a []byte containing your secret, e.g. []byte("my_secret_key")
			hmacSampleSecret := []byte("f2w8e3urw890ruiosadjfaklsf")
			return hmacSampleSecret, nil
		})

		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Error by parcing the token probably token expired"})
			return
		}

		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			fmt.Println("CLAIMS")
			fmt.Println(claims["foo"], claims["exp"])
			if float64(time.Now().Unix()) > claims["exp"].(float64) {
				ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "The token has expired"})
				return
			}

			var user models.User
			fmt.Println(token.Raw)
			database.GetDB().Model(&user).First(&user, "token = ?", token.Raw)

			if user.ID == 0 {
				ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "The user ID is not found"})
				return
			}

			if err != nil {
				ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Check for any errors not passed"})
				return
			}

			ctx.Set("user", user)

			ctx.Next()
		} else {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "token is not valid"})
			return
		}
	}
}

func getToken(ctx *gin.Context) (token string, err error) {
	bearerToken := ctx.Request.Header.Get("Authorization")
	if len(strings.Split(bearerToken, " ")) == 2 {
		token := strings.Split(bearerToken, " ")[1]
		return token, nil
	}
	return "", fmt.Errorf("got no token from the header")
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
