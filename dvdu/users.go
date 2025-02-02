package main

import (
	"bytes"
	"net/http"
	"os/exec"
)

type User struct {
	Username string

	Followers int
	Following []string

	Entry string
}

var Users []*User

func GetCurrentUsername(r *http.Request) string {
	c, err := r.Cookie("auth_user")
	if err != nil {
		return "anonymous"
	}

	return c.Value
}

func FindOrCreateUser(username string) *User {
	username = ToLowerCase(username)
	for _, user := range Users {
		if user.Username == username {
			return user
		}
	}

	u := &User{username, 0, []string{}, "hello world!"}
	Users = append(Users, u)
	return u
}

func ToLowerCase(username string) string {
	cmd := exec.Command("sh", "-c", "echo '"+username+"' | tr A-Z a-z")
	var out bytes.Buffer
	cmd.Stdout = &out
	cmd.Run()

	return out.String()
}
