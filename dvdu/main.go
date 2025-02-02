package main

import (
	"encoding/json"
	"net/http"

	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()

	// User
	r.HandleFunc("/api/users", GetUsersHandler).Methods("GET")
	r.HandleFunc("/api/users/me", GetMeHandler).Methods("GET")
	r.HandleFunc("/api/users/{username}", GetUserHandler).Methods("GET")
	r.HandleFunc("/api/users/{username}/follow", FollowUserHandler).Methods("GET")

	r.HandleFunc("/api/entry", UpdateEntryHandler).Methods("POST")

	r.PathPrefix("/").Handler(http.FileServer(http.Dir("./static/")))

	n := negroni.Classic()
	//n.Use(negroni.HandlerFunc(LocalAuthentication))

	n.UseHandler(r)
	n.Run(":7070")
}

func GetUsersHandler(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(Users)
}

func GetMeHandler(w http.ResponseWriter, r *http.Request) {
	username := GetCurrentUsername(r)
	user := FindOrCreateUser(username)
	json.NewEncoder(w).Encode(user)
}

func GetUserHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	username := vars["username"]

	user := FindOrCreateUser(username)
	json.NewEncoder(w).Encode(user)
}

func FollowUserHandler(w http.ResponseWriter, r *http.Request) {
	followerUsername := GetCurrentUsername(r)
	follower := FindOrCreateUser(followerUsername)

	vars := mux.Vars(r)
	followeeUsername := vars["username"]
	followee := FindOrCreateUser(followeeUsername)

	followee.Followers += 1
	follower.Following = append(follower.Following, followee.Username)

	json.NewEncoder(w).Encode(follower)
}

type Entry struct {
	Entry string
}

func UpdateEntryHandler(w http.ResponseWriter, r *http.Request) {
	username := GetCurrentUsername(r)
	user := FindOrCreateUser(username)

	decoder := json.NewDecoder(r.Body)
	var t Entry
	err := decoder.Decode(&t)
	if err != nil {
		panic(err)
	}

	user.Entry = t.Entry

}
