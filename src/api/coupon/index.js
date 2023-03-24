import request from '@/utils/request'

export function listCoupons(params) {
    return request({
        url: '/h5/coupon/list',
        method: 'get',
        params
    })
}