package controllers

import (
	"fmt"
	"net/http"
	"strconv"

	"golang.org/x/crypto/bcrypt"

	"github.com/fi9ish/twt/pkg/database"
	"github.com/fi9ish/twt/pkg/models"
	"github.com/gin-gonic/gin"
)

type UserUpdate struct {
	Name     string `json:"name"`
	OldValue string `json:"old_value"`
	NewValue string `json:"new_value"`
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
		Tweet.UserNickname = User.Nickname
		result := database.GetDB().Model(Tweet).Create(&Tweet)
		if result.Error != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"error": "Failed inserting Tweet into db",
			})
			return
		}
	}
}

func GetAllTweets() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var Tweets []models.Tweet
		result := database.GetDB().Model(&models.Tweet{}).Find(&Tweets)
		if result.Error != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"error": "Failed finding Tweets",
			})
			return
		}
		ctx.JSON(http.StatusOK, Tweets)
	}
}

func GetUserTweets() gin.HandlerFunc {
	return func(ctx *gin.Context) {
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
		var UserTweets []models.Tweet
		var count int
		result := database.GetDB().Model(&models.Tweet{}).Find(&UserTweets, "user_id = ?", User.ID).Count(&count)
		if result.Error != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"error": "We can't find tweets for the user you are looking for",
			})
			return
		}
		if count == 0 {
			ctx.JSON(200, gin.H{
				"message": "0 Tweets found for the user",
			})
			return
		}
		ctx.JSON(200, UserTweets)
	}
}

func GetUserInfo() gin.HandlerFunc {
	return func(ctx *gin.Context) {
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
		ctx.JSON(200, User)
	}
}

func GetTweetById() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id := ctx.Query("id")
		if id == "" {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"error": "You didn't pass the Tweet ID",
			})
			return
		}
		var tweet models.Tweet
		result := database.GetDB().Model(&tweet).First(&tweet, "ID = ?", id)
		if result.Error != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"error": "Failed to find the tweet by ID",
			})
			return
		}

		var comments []models.Comment
		resultCommets := database.GetDB().Model(&tweet).Association("Comments").Find(&comments)
		if resultCommets.Error != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"error": "Failed to find the tweet by ID",
			})
			return
		}
		ctx.JSON(200, gin.H{
			"tweet":    tweet,
			"comments": comments,
		})
	}
}

func CommentTweet() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id := ctx.Query("id")
		if id == "" {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"error": "You didn't pass the Tweet ID",
			})
			return
		}
		var comment models.Comment
		err := ctx.BindJSON(&comment)
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
		comment.UserID = User.ID
		tweetId, err := strconv.Atoi(id)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"error": "Error converting tweet id",
			})
			return
		}
		comment.TweetID = uint(tweetId)
		result := database.GetDB().Model(&comment).Create(&comment)
		if result.Error != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"error": "Error inserting comment in the DB",
			})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{
			"message": "Commented successfully",
		})
	}
}

func GetUserProfileByNickname() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		nick_name := ctx.Query("nick_name")
		if nick_name == "" {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"error": "You didn't pass the Nickname",
			})
			return
		}
		fmt.Println(nick_name)
		var User models.User
		result := database.GetDB().Model(&User).First(&User, "nickname = ?", nick_name)
		if result.Error != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"error": "Could not find user in the database",
			})
			return
		}
		ctx.JSON(http.StatusOK, User)
	}
}

func GetUserTweetsByNickname() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		nick_name := ctx.Query("nick_name")
		if nick_name == "" {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"error": "You didn't pass the Nickname",
			})
			return
		}
		fmt.Println(nick_name)
		var User models.User
		result := database.GetDB().Model(&User).First(&User, "nickname = ?", nick_name)
		if result.Error != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"error": "Could not find user in the database",
			})
			return
		}
		var UserTweets []models.Tweet
		var count int
		result = database.GetDB().Model(&models.Tweet{}).Find(&UserTweets, "user_id = ?", User.ID).Count(&count)
		if result.Error != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"error": "We can't find tweets for the user you are looking for",
			})
			return
		}
		if count == 0 {
			ctx.JSON(200, gin.H{
				"message": "0 Tweets found for the user",
			})
			return
		}
		ctx.JSON(200, UserTweets)
	}
}

func LikeTweet() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		id, _ := strconv.Atoi(ctx.Query("id"))
		if id == 0 {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"error": "You didn't pass the Tweet ID",
			})
			return
		}
		idInt := uint(id)
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
		var countTweetConnections uint
		var LikeConnections []models.Like
		fmt.Println(idInt, User.ID)
		result := database.GetDB().Where("tweet_id = ? AND user_id = ?", idInt, User.ID).Find(&LikeConnections).Count(&countTweetConnections)
		if result.Error != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"error": "Couldn't get amount of countTweetConnections",
			})
			return
		}
		fmt.Println(LikeConnections)
		fmt.Println("countTweetConnections")
		fmt.Println(countTweetConnections)
		if countTweetConnections > 0 {
			LikeConnection := models.Like{UserID: User.ID, TweetID: idInt}
			result = database.GetDB().Where("tweet_id = ? AND user_id = ?", idInt, User.ID).Delete(&LikeConnection)
			if result.Error != nil {
				ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
					"error": "Adding new like realation to database failed",
				})
				return
			}
		} else {
			LikeConnection := models.Like{UserID: User.ID, TweetID: idInt}
			result = database.GetDB().Model(&LikeConnection).Create(&LikeConnection)
			if result.Error != nil {
				ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
					"error": "Adding new like realation to database failed",
				})
				return
			}
		}
		var LikeCount uint
		result = database.GetDB().Model(&models.Like{}).Where("tweet_id = ?", idInt).Find(&models.Like{}).Count(&LikeCount)
		if result.Error != nil && result.Error.Error() != "record not found" {
			fmt.Println(result.Error)
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"error": "Can't find Likes for the following tweet",
			})
			return
		}
		result = database.GetDB().Model(&models.Tweet{}).Where("id = ?", idInt).Update("like_amount", LikeCount)
		if result.Error != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"error": "Can't update like_amount in the following tweet",
			})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{
			"message": "You liked/disliked message successfully",
		})

	}
}

func UpdateUser() gin.HandlerFunc {
	return func(ctx *gin.Context) {
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
		var UpdateRequest UserUpdate
		err := ctx.BindJSON(&UpdateRequest)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"error": "Error binding JSON user update request",
			})
			return
		}
		// added GORM soft delete
		if UpdateRequest.Name == "delete" {
			result := database.GetDB().Delete(&User)
			if result.Error != nil {
				ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
					"error": "Error deleting the user",
				})
				return
			}
			ctx.JSON(200, gin.H{"message": "we are good!"})
			return
		}
		if (UpdateRequest.Name != "email") && (UpdateRequest.Name != "password") {
			result := database.GetDB().Model(&User).Where("id = ?", User.ID).Update(UpdateRequest.Name, UpdateRequest.NewValue)
			if result.Error != nil {
				ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
					"error": "Error updating user",
				})
				return
			}
		} else {
			if UpdateRequest.Name == "password" {
				err := bcrypt.CompareHashAndPassword([]byte(User.Password), []byte(UpdateRequest.OldValue))
				if err != nil {
					ctx.JSON(http.StatusBadRequest, gin.H{
						"error": "Invalid repeated password",
					})
					return
				}
				hash, err := bcrypt.GenerateFromPassword([]byte(UpdateRequest.NewValue), 10)
				if err != nil {
					ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
						"error": "Error hashing the password before inserting into the db",
					})
					return
				}
				UpdateRequest.NewValue = string(hash)
				result := database.GetDB().Model(&User).Where("id = ?", User.ID).Update(UpdateRequest.Name, UpdateRequest.NewValue)
				if result.Error != nil {
					ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
						"error": "Error updating user",
					})
					return
				}
			} else {
				fmt.Println(User.Email)
				fmt.Println(UpdateRequest.OldValue)
				if User.Email != UpdateRequest.OldValue {
					ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
						"error": "Your old email doesn't math",
					})
					return
				}
				result := database.GetDB().Model(&User).Where("id = ?", User.ID).Update(UpdateRequest.Name, UpdateRequest.NewValue)
				if result.Error != nil {
					ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
						"error": "Error updating user",
					})
					return
				}
			}
		}
	}
}

func EditTweet() gin.HandlerFunc {
	return func(ctx *gin.Context) {
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
		tweetID := ctx.Query("tweet_id")
		if tweetID == "" {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"error": "You didn't pass the Nickname",
			})
			return
		}
		newTweet := ctx.Query("new_tweet")
		if newTweet == "" {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"error": "You didn't pass the Nickname",
			})
			return
		}
		// var userTweets []models.Tweet
		// result := database.GetDB().Model(&User).Where("id = ?", User.ID).Association("Tweets").Find(&userTweets)
		// if result.Error != nil {
		// 	ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
		// 		"error": "Can't update like_amount in the following tweet",
		// 	})
		// 	return
		// }
		var tweetToUpdate models.Tweet
		resultNew := database.GetDB().Find(&tweetToUpdate, "id = ? AND user_id = ?", tweetID, User.ID).Update("tweet", newTweet)
		if resultNew.Error != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"error": "Can't update the tweet, you may not be the author",
			})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{
			"message": "Status ok the tweet was updated successfully",
		})
	}
}

func Subscribe() gin.HandlerFunc {
	return func(ctx *gin.Context) {
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
		userID := ctx.Query("user_id")
		userIDInt, _ := strconv.Atoi(userID)
		if userIDInt == 0 {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"error": "You didn't pass the Nickname",
			})
			return
		}

		if User.ID == uint(userIDInt) {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"error": "You can not subscribe on yourself",
			})
			return
		}
		var connection models.Follow
		var count int
		result := database.GetDB().Model(&models.Follow{}).Where("subscriber_id = ? AND followed_id = ?", User.ID, userIDInt).First(&connection).Count(&count)
		if result.Error != nil && result.Error.Error() != "record not found" {
			fmt.Println(result.Error)
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"error": "Error when searching for following relationship",
			})
			return
		}
		if count == 0 {
			fmt.Println(User.ID, userIDInt)
			result = database.GetDB().Create(&models.Follow{SubscriberID: User.ID, FollowedID: uint(userIDInt)})
			if result.Error != nil {
				ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
					"error": "error adding the following relationship",
				})
				return
			}
		} else if count > 0 {
			result = database.GetDB().Delete(&models.Follow{SubscriberID: User.ID, FollowedID: uint(userIDInt)})
			if result.Error != nil {
				ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
					"error": "Error deleting the existing connection",
				})
				return
			}
		}
		var FollowersAmount uint
		result = database.GetDB().Where("followed_id = ?", userIDInt).Find(&models.Follow{}).Count(&FollowersAmount)
		if result.Error != nil && result.Error.Error() != "record not found" {
			fmt.Println(result.Error)
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"error": "Error finding all followers",
			})
			return
		}
		result = database.GetDB().Model(&models.User{}).Where("id = ?", userIDInt).Update("followers_count", FollowersAmount)
		if result.Error != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"error": "Error updating followers_count",
			})
			return
		}
	}
}

func SignOut() gin.HandlerFunc {
	return func(ctx *gin.Context) {
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
		result := database.GetDB().Model(&models.User{}).Where("id = ?", User.ID).Update("token", "")
		if result.Error != nil {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"error": "Error deleting the Usertoken",
			})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{
			"message": "SignedOut successfully!",
		})
	}
}
