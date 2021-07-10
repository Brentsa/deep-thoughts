import decode from 'jwt-decode';

class AuthService{

    //retrieve data in the saved token
    getProfile(){
        return decode(this.getToken());
    }

    //check if the user is still logged in
    loggedIn(){
        //Get the current token and see if it is defined
        const token = this.getToken();
        //If the token is defined then check if it is expired and return true or false
        return !!token && !this.isTokenExpired(token);
    }

    //check if the token is expired
    isTokenExpired(token){
        try{
            const decoded = decode(token);
            
            if(decoded.exp < Date.now()/1000) return true;
            else return false;
        }
        catch(err){
            return false;
        }
    }

    //retrieve token from localStorage
    getToken(){
        return localStorage.getItem('id_token');
    }

    //set token to local storage and reload page to home
    login(idToken){
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    //clear token from local storage and force a logout with a reload
    logout(){
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }
}

export default new AuthService();