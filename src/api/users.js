import data from '../data/users.json' 

const usersKey = "users"

const getUsers = async () => {
    const users = JSON.parse(localStorage.getItem(usersKey))
    
    if (!users || users.length == 0) {
        localStorage.setItem(usersKey, JSON.stringify(data))
        return data
    }

    return users
}

const deleteUser = async (userIndex) => {
    const users = JSON.parse(localStorage.getItem(usersKey))

    users.splice(userIndex, 1)
 
    localStorage.setItem(usersKey, JSON.stringify(users))
}

export {getUsers, deleteUser}