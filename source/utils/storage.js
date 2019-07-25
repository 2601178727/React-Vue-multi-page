import Request from '@/fetch/api'

class MyStorage{
    constructor() {
        this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjE4NjMwODUwNDY4In0sImlhdCI6MTU1MTgzNjcxNn0.VJ_efRKeu5cyGZPunZCqm-FYCcMmVAAULmOhtYuVWmo'
        this.url = 'application/redisSaveMsg'
        this.request = new Request(this.token)
    }
    set(key, value) {
        const self = this
        return new Promise(function(resolve, reject) {
            if (!key) reject('缺少参数key')
            if (!value) reject('缺少参数value')
            self.request.post(self.url, {key, value}).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
    get(key) {
        return new Promise(function(resolve, reject) {
            if (!key) reject('缺少参数key')
            this.request.post(this.url, {key}).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

const myStorage = new MyStorage()

export default myStorage
