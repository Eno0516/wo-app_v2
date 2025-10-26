package service

import (
	"fmt"

	"github.com/Eno0516/wo-app-ver2/backend/generated/api"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

func (s *Service) LoginUserCheck(item api.LoginOrder) api.LoginUser {
	param := *item.Id
	dbRes := s.dbRepo.GetLoginUser(param)
	if err := bcrypt.CompareHashAndPassword([]byte(dbRes.PasswordHash), []byte(*item.Password)); err != nil {
		fmt.Errorf("invalid password")
	}

	var UserUUID uuid.UUID
	if dbRes.Uuid != "" {
		parsed, err := uuid.Parse(*&dbRes.Uuid)
		if err != nil {
			fmt.Errorf("uuid parse failed")
		}
		UserUUID = parsed
	}

	loginUser := api.LoginUser{
		Uuid: &UserUUID,
	}
	return loginUser
}
