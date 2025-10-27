package service

import (
	"github.com/Eno0516/wo-app-ver2/backend/generated/api"
	appError "github.com/Eno0516/wo-app-ver2/backend/internal/error"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

func (s *Service) LoginUserCheck(item api.LoginOrder) (api.LoginUser, error) {
	param := *item.Id
	dbRes, err := s.dbRepo.GetLoginUser(param)
	if err != nil {
		return api.LoginUser{}, err
	}
	if err := bcrypt.CompareHashAndPassword([]byte(dbRes.PasswordHash), []byte(*item.Password)); err != nil {
		return api.LoginUser{}, appError.NewError(401, "Password Not Match", err)
	}

	var UserUUID uuid.UUID
	if dbRes.Uuid != "" {
		parsed, err := uuid.Parse(dbRes.Uuid)
		if err != nil {
			return api.LoginUser{}, appError.NewError(500, "uuid parse error", err)
		}
		UserUUID = parsed
	}

	loginUser := api.LoginUser{
		Uuid: &UserUUID,
	}
	return loginUser, nil
}
