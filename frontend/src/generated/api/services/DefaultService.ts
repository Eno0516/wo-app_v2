/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CellInfo } from '../models/CellInfo';
import type { FarmInfo } from '../models/FarmInfo';
import type { FarmInfoDetail } from '../models/FarmInfoDetail';
import type { FarmPageBasicInfo } from '../models/FarmPageBasicInfo';
import type { FurrowBasicInfo } from '../models/FurrowBasicInfo';
import type { FurrowCellInfo } from '../models/FurrowCellInfo';
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
    /**
     * Get Farms by GroupUUID
     * @param groupUuid
     * @returns FarmInfo OK
     * @throws ApiError
     */
    public static getGroupsManageFarms(
        groupUuid: string,
    ): CancelablePromise<Array<FarmInfo>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/groups/{groupUuid}/manageFarms',
            path: {
                'groupUuid': groupUuid,
            },
        });
    }
    /**
     * Register New Farm
     * @param groupUuid
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postGroupsManageFarms(
        groupUuid: string,
        requestBody: FarmInfoDetail,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/groups/{groupUuid}/manageFarms',
            path: {
                'groupUuid': groupUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get Farm Page Info
     * @param farmUuid
     * @returns FarmPageBasicInfo OK
     * @throws ApiError
     */
    public static getManageFarms(
        farmUuid: string,
    ): CancelablePromise<Array<FarmPageBasicInfo>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/manageFarms/{farmUuid}',
            path: {
                'farmUuid': farmUuid,
            },
        });
    }
    /**
     * Get furrow Info
     * @param farmUuid
     * @param farmManageUuid
     * @returns FurrowBasicInfo Farm page info
     * @throws ApiError
     */
    public static getManageFarms1(
        farmUuid: string,
        farmManageUuid: string,
    ): CancelablePromise<FurrowBasicInfo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/manageFarms/{farmUuid}/{farmManageUuid}',
            path: {
                'farmUuid': farmUuid,
                'farmManageUuid': farmManageUuid,
            },
        });
    }
    /**
     * Update Farm FarmInfo
     * @param farmUuid
     * @param farmManageUuid
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static putManageFarms(
        farmUuid: string,
        farmManageUuid: string,
        requestBody: FarmInfoDetail,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/manageFarms/{farmUuid}/{farmManageUuid}',
            path: {
                'farmUuid': farmUuid,
                'farmManageUuid': farmManageUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get Furrow Cell Info
     * @param farmUuid
     * @param farmManageUuid
     * @param rowId
     * @returns FurrowCellInfo Furrow Cell Info
     * @throws ApiError
     */
    public static getManageFarms2(
        farmUuid: string,
        farmManageUuid: string,
        rowId: number,
    ): CancelablePromise<FurrowCellInfo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/manageFarms/{farmUuid}/{farmManageUuid}/{rowId}',
            path: {
                'farmUuid': farmUuid,
                'farmManageUuid': farmManageUuid,
                'rowId': rowId,
            },
        });
    }
    /**
     * Create Furrow Cell Info
     * @param farmUuid
     * @param farmManageUuid
     * @param rowId
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postManageFarms(
        farmUuid: string,
        farmManageUuid: string,
        rowId: number,
        requestBody: FurrowCellInfo,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/manageFarms/{farmUuid}/{farmManageUuid}/{rowId}',
            path: {
                'farmUuid': farmUuid,
                'farmManageUuid': farmManageUuid,
                'rowId': rowId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Update Furrow Cell Info
     * @param farmUuid
     * @param farmManageUuid
     * @param rowId
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static putManageFarms1(
        farmUuid: string,
        farmManageUuid: string,
        rowId: number,
        requestBody: FurrowCellInfo,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/manageFarms/{farmUuid}/{farmManageUuid}/{rowId}',
            path: {
                'farmUuid': farmUuid,
                'farmManageUuid': farmManageUuid,
                'rowId': rowId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Create Cell Info
     * @param farmUuid
     * @param farmManageUuid
     * @param rowId
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postManageFarmsCell(
        farmUuid: string,
        farmManageUuid: string,
        rowId: number,
        requestBody: CellInfo,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/manageFarms/{farmUuid}/{farmManageUuid}/{rowId}/cell',
            path: {
                'farmUuid': farmUuid,
                'farmManageUuid': farmManageUuid,
                'rowId': rowId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Update Cell Info
     * @param farmUuid
     * @param farmManageUuid
     * @param rowId
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static putManageFarmsCell(
        farmUuid: string,
        farmManageUuid: string,
        rowId: number,
        requestBody: CellInfo,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/manageFarms/{farmUuid}/{farmManageUuid}/{rowId}/cell',
            path: {
                'farmUuid': farmUuid,
                'farmManageUuid': farmManageUuid,
                'rowId': rowId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
