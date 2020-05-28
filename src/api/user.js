export async function loginUser(username, password) {
    let userDetails = await fetch('http://localhost:3100/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then(res => {
            if (!res.headers.get('auth-token')) return res.json();
            let token = res.headers.get('auth-token');
            return res.json().then(userData => {
                return { ...userData, token }
            });
        })
    return userDetails;
}


export async function getSingleUserDetails(token) {
    let userDetails = await fetch('http://localhost:3100/users/' + token, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
        },
    })
        .then(res => res.json())
    return userDetails;
}