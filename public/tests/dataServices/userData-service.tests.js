import { userDataService } from 'userData-service';

import { DataService } from 'data-service';
import { requester } from 'requester';
import { validator } from 'validator';

const { expect } = chai;

describe("userDataService tests", () => {

    describe("Correct userDataService object tests", () => {
        it("Expect userDataService to exist", () => {
            expect(userDataService).to.exist;
        });
        it("Expect userDataService to be an object", () => {
            expect(userDataService).to.be.an('object');
        });
        it("Expect userDataService to inherit data service", () => {
            expect(userDataService).to.be.an.instanceof(DataService);
        });
        it("Expect userDataService to have correct username constants", () => {
            const MIN_USERNAME_LENGTH = 3,
                MAX_USERNAME_LENGTH = 10,
                INVALID_USERNAME_MESSAGE = `Username`;

            expect(userDataService.MIN_USERNAME_LENGTH).to.equal(MIN_USERNAME_LENGTH);
            expect(userDataService.MAX_USERNAME_LENGTH).to.equal(MAX_USERNAME_LENGTH);
            expect(userDataService.INVALID_USERNAME_MESSAGE).to.include(INVALID_USERNAME_MESSAGE);
        });
        it("Expect userDataService to have correct password constants", () => {
            const MIN_PASSWORD_LENGTH = 4,
                MAX_PASSWORD_LENGTH = 12,
                INVALID_PASSWORD_MESSAGE = `Password`;

            expect(userDataService.MIN_PASSWORD_LENGTH).to.equal(MIN_PASSWORD_LENGTH);
            expect(userDataService.MAX_PASSWORD_LENGTH).to.equal(MAX_PASSWORD_LENGTH);
            expect(userDataService.INVALID_PASSWORD_MESSAGE).to.include(INVALID_PASSWORD_MESSAGE);
        });
        it("Expect userDataService to have correct backend provider constants", () => {
            const BASE_DOMAIN = 'https://baas.kinvey.com',
                APP_KEY = 'kid_r1YobYsRl',
                APP_SECRET = 'f1762ef8104346d19263226a4a9b1e7f',
                AUTHORIZATION = `Basic ${btoa(APP_KEY+':' +APP_SECRET)}`,
                AUTHTOKEN_COMMAND = 'Kinvey ';

            expect(userDataService.BASE_DOMAIN).to.equal(BASE_DOMAIN);
            expect(userDataService.APP_KEY).to.equal(APP_KEY);
            expect(userDataService.APP_SECRET).to.equal(APP_SECRET);
            expect(userDataService.AUTHORIZATION).to.equal(AUTHORIZATION);
            expect(userDataService.AUTHTOKEN_COMMAND).to.equal(AUTHTOKEN_COMMAND);
        });
        it("Expect userDataService to have correct cookie removal constants", () => {
            const REMOVED_USERNAME_COOKIE = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;",
                REMOVED_AUTHTOKEN_COOKIE = "authtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            expect(userDataService.REMOVED_USERNAME_COOKIE).to.equal(REMOVED_USERNAME_COOKIE);
            expect(userDataService.REMOVED_AUTHTOKEN_COOKIE).to.equal(REMOVED_AUTHTOKEN_COOKIE);
        });
        it("Expect userDataService to have correct register message constants", () => {
            const SUCCESSFUL_REGISTER_MESSAGE = 'Registered successfully!',
                ERROR_REGISTER_MESSAGE = 'Username alredy exist!';

            expect(userDataService.SUCCESSFUL_REGISTER_MESSAGE).to.equal(SUCCESSFUL_REGISTER_MESSAGE);
            expect(userDataService.ERROR_REGISTER_MESSAGE).to.equal(ERROR_REGISTER_MESSAGE);
        });
        it("Expect userDataService to have correct login message constants", () => {
            const SUCCESSFUL_LOGIN_MESSAGE = `Welcome, `,
                ERROR_LOGIN_MESSAGE = 'Invalid username or password!';

            expect(userDataService.SUCCESSFUL_LOGIN_MESSAGE).to.equal(SUCCESSFUL_LOGIN_MESSAGE);
            expect(userDataService.ERROR_LOGIN_MESSAGE).to.equal(ERROR_LOGIN_MESSAGE);
        });
        it("Expect userDataService to have correct logout message constants", () => {
            const SUCCESSFUL_LOGOUT_MESSAGE = 'Goodbye!',
                ERROR_LOGOUT_MESSAGE = 'Failed to logout!';

            expect(userDataService.SUCCESSFUL_LOGOUT_MESSAGE).to.equal(SUCCESSFUL_LOGOUT_MESSAGE);
            expect(userDataService.ERROR_LOGOUT_MESSAGE).to.equal(ERROR_LOGOUT_MESSAGE);
        });
        it("Expect userDataService to have getUserData() function", () => {
            expect(userDataService.getUserData).to.be.a('function');
        });
        it("Expect userDataService to have validateUserData() function", () => {
            expect(userDataService.validateUserData).to.be.a('function');
        });
        it("Expect userDataService to have register() function", () => {
            expect(userDataService.register).to.be.a('function');
        });
        it("Expect userDataService to have login() function", () => {
            expect(userDataService.login).to.be.a('function');
        });
        it("Expect userDataService to have logout() function", () => {
            expect(userDataService.logout).to.be.a('function');
        });
        it("Expect userDataService to have getUsername() function", () => {
            expect(userDataService.getUsername).to.be.a('function');
        });
        it("Expect userDataService to have _getAuthToken() function", () => {
            expect(userDataService._getAuthToken).to.be.a('function');
        });
        it("Expect userDataService to have isLoggedUser() function", () => {
            expect(userDataService.isLoggedUser).to.be.a('function');
        });

        describe("Requester property tests", () => {
            it("Expect userDataService to have requester object as property", () => {
                expect(userDataService).to.haveOwnProperty('_requester');
            });
            it("Expect userDataService.requester to be an object", () => {
                expect(userDataService.requester).to.be.an('object');
            });
            it("Expect userDataService.requester to be the exported module 'requester'", () => {
                expect(userDataService.requester).to.deep.equal(requester);
            });
        });

        describe("Validator property tests", () => {
            it("Expect userDataService to have validator object as property", () => {
                expect(userDataService).to.haveOwnProperty('validator');
            });
            it("Expect userDataService.validator to be an object", () => {
                expect(userDataService.validator).to.be.an('object');
            });
            it("Expect userDataService.validator to be the exported module 'validator'", () => {
                expect(userDataService.validator).to.deep.equal(validator);
            });
        });
    });

    describe("Behavior tests", () => {

        describe("getUserData() tests", () => {
            let mockedjQuery;

            beforeEach(() => {
                mockedjQuery = sinon.stub($.fn, 'val');
                mockedjQuery
                    .returns('username')
                    .returns('password');
            });

            afterEach(() => {
                mockedjQuery.restore();
            })

            it("Expect getUserData() to call jQuery.val() 4 times", () => {
                userDataService.getUserData();

                expect(mockedjQuery).to.have.callCount(4);
            });
            it("Expect getUserData() to call jQuery.val() with correct parameters", () => {
                userDataService.getUserData();

                expect(mockedjQuery.getCall(0).args.length).to.be.equal(0);
                expect(mockedjQuery.getCall(1).args.length).to.be.equal(0);
                expect(mockedjQuery.getCall(2).args[0]).to.be.equal('');
                expect(mockedjQuery.getCall(3).args[0]).to.be.equal('');
            });
        });
    });
});


// import 'mocha';
// import 'chai';
// import 'sinon';
// import 'sinon-chai';