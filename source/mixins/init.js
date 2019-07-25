import vconsole from 'vconsole'
import { ACTION } from '@/config/config'

const igonre = [
    'https://test.tjssy.cn:2333/api/v1/',
    'https://prod.tjssy.cn:2333/api/v1/'
]

const init = {
    mounted() {
        const VC = igonre.indexOf(ACTION) > -1 ? '' : new vconsole() 
    }
}

export const VC = igonre.indexOf(ACTION) > -1 ? '' : new vconsole() 

export default init
