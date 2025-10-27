package appError

// エラーを振り分けるときの関数
func (e *AppError) DistributeError() string {
	if e.Err != nil {
		return e.Message + ":" + e.Err.Error()
	}
	return e.Message
}
