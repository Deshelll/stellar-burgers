/// <reference types="cypress" />
import { should } from 'chai';
import  ingredients from '../fixtures/ingredients.json';
describe('[api/ingredients]', () => {
    it('Перехват запроса', () => {
        cy.intercept('GET', '**/api/ingredients', {
           fixture: 'ingredients.json' 
        }).as('getIngredients');

        cy.visit('/');
        cy.wait('@getIngredients');
        
        ingredients.data.forEach((product) => {
            cy.contains(product.name).should('exist');
        });
    });
});

describe('[constructor]', () => {
    it('Добавление ингредиента из списка в конструктор', () => {
        cy.intercept('GET', '**/api/ingredients', {
            fixture: 'ingredients.json'
        }).as('getIngredients');

        cy.visit('/');
        cy.wait('@getIngredients');

        const ingredientName = ingredients.data[0].name;

        cy.get('[data-testid="burger-constructor"]').should('not.contain', ingredientName);

        cy.get(`[data-testid="ingredients-card"]`).first().within(() => {
            cy.contains('Добавить').click();
        });

        cy.get('[data-testid="burger-constructor"]').should('contain', ingredientName);
    });
});

describe('[modal]', () => {
    it('Откытие и закрытие модального окна ингредиента', () => {
        cy.intercept('GET', '**/api/ingredients', {
            fixture: 'ingredients.json'
        }).as('getIngredients');

        cy.visit('/');
        cy.wait('@getIngredients');

        const ingredientName = 'Филе Люминесцентного тетраодонтимформа';

        cy.get('[data-testid="modal"]').should('not.exist');

        cy.contains('[data-testid="ingredients-card"]', ingredientName).click();
        cy.get('[data-testid="modal"]').should('exist');
        cy.get('[data-testid="modal"]').should('contain', ingredientName);
        //cy.get('[data-testid="ingredients-card"]').first().click();
        //Закрытие на крестик
        //cy.get('[data-testid="modal"]').should('exist');
        cy.get('[data-testid="modal-button-close"]').click();
        cy.get('[data-testid="modal"]').should('not.exist');

        cy.contains('[data-testid="ingredients-card"]', ingredientName).click();
        cy.get('[data-testid="modal"]').should('exist');
        //cy.get('[data-testid="ingredients-card"]').first().click();
        //Закрытие на оверлей
        //cy.get('[data-testid="modal"]').should('exist');
        cy.get('[data-testid="modal-overlay-close"]').click({force: true});
        cy.get('[data-testid="modal"]').should('not.exist');
    });
});

describe('[order]', () => {
    it('Создание заказа', () => {
        cy.intercept('GET', '**/api/ingredients', {
            fixture: 'ingredients.json'
        }).as('getIngredients');

        cy.intercept('GET', '**/api/auth/user', {
            fixture: 'user.json'
        }).as('getUser');

        cy.intercept('POST', '**/api/orders', {
            fixture: 'postOrder.json'
        }).as('postOrder');

        cy.setCookie('accessToken', 'mockToken');

        cy.visit('/');
        cy.wait('@getIngredients');
        cy.wait('@getUser');

        const bun = 'Краторная булка N-200i';
        const ingredient = 'Биокотлета из марсианской Магнолии';

        cy.contains(`[data-testid="ingredients-card"]`, bun).contains('Добавить').click();
        cy.contains(`[data-testid="ingredients-card"]`, ingredient).contains('Добавить').click();

        cy.get('[data-testid="burger-constructor"]').should('not.contain.text', 'Выберите булки');
        cy.get('[data-testid="burger-constructor"]').should('contain.text', 'Краторная булка N-200i');
        cy.get('[data-testid="burger-constructor"]').should('not.contain.text', 'Выберите начинку');
        cy.get('[data-testid="burger-constructor"]').should('contain.text', 'Биокотлета из марсианской Магнолии');

        cy.contains('Оформить заказ').click();
        cy.wait('@postOrder');

        cy.get('[data-testid="modal"]').should('exist');
        cy.contains('75999').should('exist');

        cy.get('[data-testid="modal-button-close"]').click();
        cy.get('[data-testid="modal"]').should('not.exist');

        cy.get('[data-testid="burger-constructor"]').should('contain.text', 'Выберите булки');
        cy.get('[data-testid="burger-constructor"]').should('contain.text', 'Выберите начинку');
    });
});