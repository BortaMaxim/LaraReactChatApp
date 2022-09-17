import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

let token = localStorage.getItem('user-token')
let options = {
    broadcaster: 'pusher',
    key: '4fad72f4e8cc5f694165',
    cluster: 'eu',
    host: '127.0.0.1',
    forceTLS: true,
    authEndpoint: `http://127.0.0.1:8000/broadcasting/auth`,
    auth: {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        }
    }
}
//
// export const pusher = new Pusher('4fad72f4e8cc5f694165', {
//     encrypted: true,
//     cluster: 'eu',
//     authEndpoint: `http://127.0.0.1:8000/broadcasting/auth`,
//     auth: {
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             'Accept': 'application/json'
//         }
//     }
// });
//
export const echo = new Echo(options)

// echo.channel('user-status').notification((data) => {
//     console.log(data)
// })

// const channel = pusher.subscribe('user-status')
//
// channel.bind('App\\Events\\LoggedInEvent', function(data) {
//     console.log('Channel subscribed')
//     console.log(data)
// })


