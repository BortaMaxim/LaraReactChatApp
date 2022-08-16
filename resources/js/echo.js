import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import {URL} from '../js/redux/options'

let token = localStorage.getItem('user-token')
let options = {
    broadcaster: 'pusher',
    key: 'adf9f6a78cd249c2c68f',
    cluster: 'eu',
    forceTLS: true,
    authEndpoint: `${URL}/broadcasting/auth`,
    auth: {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        }
    }
}

export default new Echo({
    ...options,
    client: new Pusher(options.key, options)
})


