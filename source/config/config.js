export const ACTION =  process.env.NODE_ENV === 'development' ?
'http://192.168.0.175:8081/api/v1/':
'http://192.168.0.175:8081/api/v1/'

export const STATIC = process.env.NODE_ENV === 'development' ?
'http://192.168.0.175:8081/' :
'http://192.168.0.175:8081/'

export const HREF = process.env.NODE_ENV === 'development' ?  // 用于route
'http://192.168.0.154/view/' : 
'http://192.168.0.154/h5/dist/view/'
