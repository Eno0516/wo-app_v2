/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Item } from '../models/Item';
import type { LoginOrder } from '../models/LoginOrder';
import type { LoginUser } from '../models/LoginUser';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * Order to login
     * @param requestBody
     * @returns LoginUser OK
     * @throws ApiError
     */
    public static postLogin(
        requestBody: LoginOrder,
    ): CancelablePromise<LoginUser> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get all users
     * @returns Item OK
     * @throws ApiError
     */
    public static getManagePlant(): CancelablePromise<Array<Item>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/managePlant',
        });
    }
}
