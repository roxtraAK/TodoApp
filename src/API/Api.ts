import axios from "axios";

export interface IUser {
    firstname: string;
    lastname: string;
    username?: string;
    password?: string;
}

export async function getUserProfile(username: string, password: string): Promise<IUser|undefined> {
    try {
        const response = await axios.get(`http://localhost:3000/auth?username=${username}?password=${password}`);
        const userData = response.data;
        console.log(userData);
        
        if (isValidUserData(userData)) {
            return userData;
        } else {
            throw new Error('Ungültige Benutzerdaten empfangen');
        }
    } catch (error) {
        console.error("Fehler beim Abrufen des Benutzerprofils: ", error);
        return undefined;
    }
}

function isValidUserData(data: any): data is IUser {
    return (
        typeof data === 'object' &&
        'firstname' in data &&
        'lastname' in data &&
        'email' in data &&
        'phonenumber' in data &&
        'username' in data &&
        'password' in data
    );
}
