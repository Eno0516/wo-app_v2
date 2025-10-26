package service

import (
	"github.com/Eno0516/wo-app-ver2/backend/generated/api"
	"github.com/Eno0516/wo-app-ver2/backend/generated/sql"
	openapi_types "github.com/oapi-codegen/runtime/types"
)

func (s *Service) LoginUserCheck(item api.LoginOrder) api.LoginUser {
	param := sql.GetLoginUserParams{
		Username: *item.Id,
		Crypt:    *item.Password,
	}
	uuid := s.dbRepo.GetLoginUserUUID(param)
	loginUser := api.LoginUser{
		Uuid: (*openapi_types.UUID)(&uuid),
	}
	return loginUser
}
