package service

import (
	"github.com/Eno0516/wo-app-ver2/backend/generated/api"
	appError "github.com/Eno0516/wo-app-ver2/backend/internal/error"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

func (s *Service) LoginUserCheck(item api.LoginOrder) (api.LoginUser, error) {
	dbRes, err := s.dbRepo.GetLoginUser(*item.UserId, *item.GroupId)
	if err != nil {
		return api.LoginUser{}, err
	}
	if err := bcrypt.CompareHashAndPassword([]byte(dbRes.PasswordHash), []byte(*item.Password)); err != nil {
		return api.LoginUser{}, appError.NewError(401, "Password Not Match", err)
	}

	parsedUser, err := uuid.Parse(dbRes.UserUUID)
	if err != nil {
		return api.LoginUser{}, appError.NewError(500, "UserUuid parse error", err)
	}
	parsedGroup, err := uuid.Parse(dbRes.GroupUUID)
	if err != nil {
		return api.LoginUser{}, appError.NewError(500, "GroupUuid parse error", err)
	}
	loginUser := api.LoginUser{
		UserUuid:  &parsedUser,
		GroupUuid: &parsedGroup,
	}
	return loginUser, nil
}
