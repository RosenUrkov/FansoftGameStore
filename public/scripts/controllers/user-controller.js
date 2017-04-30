import { Controller } from 'controller';
import { userDataService } from 'userData-service';
import { templateLoader } from 'template-loader';
import { notificator } from 'notificator';
import { validator } from 'validator';

class UserController extends Controller {
    constructor(userDataService, templateLoader, notificator, validator) {
        super(userDataService, templateLoader, notificator, validator);
    }

    home(router) {
        templateLoader.loadTemplate('home')
            .then(template => $('#content').html(template));
    }

    login(router) {
        templateLoader.loadTemplate('login')
            .then((template) => {
                $('#content').html(template);

                $('#sign-up').on('click', () => {
                    this.dataService.getUserData()
                        .then(user => this.dataService.register(user))
                        .then((message) => this.notificator.success(message))
                        .catch((message) => this.notificator.error(message))
                });

                $('#sign-in').on('click', () => {
                    this.dataService.getUserData()
                        .then(user => this.dataService.login(user))
                        .then((message) => {
                            this.notificator.success(message);
                            router.redirect('#/home');
                            this.checkUser();
                        })
                        .catch((message) => this.notificator.error(message))
                });
            })
    }

    logout() {
        this.dataService.logout()
            .then((message) => {
                this.notificator.success(message);
                this.checkUser();
            })
            .catch((message) => this.notificator.error(message));
    }

    myCart() {

    }

    checkUser() {
        if (this.dataService.isLoggedUser()) {
            $('#sign-out').html('Logout');
            $('.nav').one('click', '#sign-out', () => this.logout());
            $('.user-controls').css('display', '');
            $('#user').html(this.dataService.getUsername());
            return true;
        } else {
            $('#sign-out').html('Login');
            $('.user-controls').css('display', 'none');
            return false;
        }
    }
}

const userController = new UserController(userDataService, templateLoader, notificator, validator);
export { userController };