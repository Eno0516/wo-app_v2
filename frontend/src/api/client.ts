import { OpenAPI, DefaultService } from "../generated/api/index";

// 環境変数から API ベース URL を設定
OpenAPI.BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

// 認証が必要ならトークンも設定
// OpenAPI.TOKEN = async () => "my-jwt-token";

export const apiClient = DefaultService;
