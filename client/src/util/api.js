import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

let api =  axios.create({
    baseURL: "http://localhost:5000/",
    responseType: "json"
});

let mock = new MockAdapter(api);
function mockAPI(mock) {
    mock.onPost('users/login', {email: 'test@test.com', password: 'TestPassword1'}).reply(
        200,
        { token: 'MOCK-TOKEN'}
    );
    
    mock.onPost('users/login', {email: 'test@test.com', password: 'TestPassword2'}).reply(
        401,
        { email: "An account was found but the password is incorrect.",
        password: ''
        }
    );
    
    mock.onPost('users/login').reply(
        404,
        { email: "No account with this email exists.",
        password: ''
        }
    );
    
    mock.onPost('users/register', {firstName: "Max", lastName: "Withrow", email: 'test@test.com', password: 'TestPassword1'}).reply(
        201,
        { email: 'test@test.com',
          password: 'TestPassword1'
        }
    );
    
    mock.onPost('users/register', {firstName: "Max", lastName: "Withrow", email: 'test@test.com', password: 'TestPassword2'}).reply(
        409,
        { email: "Account could not be created. User already exists.",
        password: ''
        }
    );
    
    mock.onPost('users/register').reply(
        401,
        { email: "Signup Failed",
        password: ''
        }
    );
    
}

mockAPI(mock);

export default api