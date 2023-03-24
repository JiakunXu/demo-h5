import request from '@/utils/request'

export function getTicket(params) {
    return request({
        url: '/weixin/ticket',
        method: 'get',
        params
    })
}