package appError

import "fmt"

// このアプリで定義するエラー型
type AppError struct {
	Status  int    // httpステータスコード
	Message string // 表示用のメッセージ
	Err     error  // 元のエラー
}

// エラーを吐くときの関数
func NewError(status int, msg string, err error) *AppError {
	return &AppError{
		Status:  status,
		Message: msg,
		Err:     err,
	}
}

// Error interfaceを満たすための関数
func (e *AppError) Error() string {
	if e.Err != nil {
		return fmt.Sprintf("%s: %v", e.Message, e.Err)
	}
	return e.Message
}
