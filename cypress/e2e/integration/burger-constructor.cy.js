describe('Проверка оформления заказа Stellar burgers', () => {
    beforeEach(() => {
        cy.viewport(1400, 1000);
        cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" });
    })

    it('Должно быть доступно на localhost:3000', function () {
        cy.visit('http://localhost:3000');
    });

    it('Добавление ингредиентов в конструктор', () => {
        cy.get('[data-test-id="ingredient"]')
            .first()
            .then(($el) => {
                const elText1 = $el.find('[data-test-id="ingredient-name"]').text();
                cy.wrap($el).trigger("dragstart");
                cy.get('[data-test="selected"]').trigger('drop');
                cy.get('[data-test-id="burger-bun-element"]')
                    .contains(elText1)
                    .should("exist");
            });
        cy.get('[data-test-id="burger-bun-element"]').should("have.length", 2);

        cy.get('[data-test-id="ingredient"]')
            .eq(3)
            .then(($el) => {
                const elText = $el.find('[data-test-id="ingredient-name"]').text();
                cy.wrap($el).trigger("dragstart");
                cy.get('[data-test="selected"]').trigger('drop');
                cy.get('[data-test-id="burger-element"]')
                    .contains(elText)
                    .should("exist");
                cy.get('[data-test-id="burger-element"]').should("have.length", 1);
            });
        cy.get('[data-test-id="ingredient"]')
            .eq(7)
            .then(($el) => {
                const elText = $el.find('[data-test-id="ingredient-name"]').text();
                cy.wrap($el).trigger("dragstart");
                cy.get('[data-test="selected"]').trigger('drop');
                cy.get('[data-test-id="burger-element"]')
                    .contains(elText)
                    .should("exist");
                cy.get('[data-test-id="burger-element"]').should("have.length", 2);
            });
    });

    it('Открытие модального окна с описанием ингредиента', () => {
        cy.get('[data-test-id="ingredient"]')
            .first().click();
        cy.location('pathname').should('eq', '/ingredients/60d3b41abdacab0026a733c6');
        cy.get('.modal_modal__mg41g').should('exist');
        cy.get('.modal_modal__mg41g').contains('Детали ингредиента');
        cy.get('.modal_modal__mg41g').contains('Краторная булка N-200i');
    });

    it('Закрытие модального окна с описанием ингредиента', function () {
        cy.get('.modal_modal__mg41g').find('svg').click();
        cy.get('.modal_modal__mg41g').should('not.exist');
    });

    it('Оформление заказа без авторизации', function () {
        cy.get('button').contains('Оформить заказ').click();
        cy.location('pathname').should('eq', '/login');
    });

    it('Оформление заказа с авторизацией и с открытием модального окна с номером заказа', function () {
        cy.location('pathname').should('eq', '/login');
        cy.get('input[name="email"]').type('test11@ya.ru');
        cy.get('input[name="password"]').type('password');
        cy.get('button').contains('Войти').click();
        cy.location('pathname').should('eq', '/');
        cy.get('button').contains('Оформить заказ').click();
        cy.intercept('POST','https://norma.nomoreparties.space/api/orders').as('getOrder');
        cy.wait('@getOrder').its('response.statusCode').should('eq', 200);
        cy.get('.modal_modal__mg41g').should('exist');
    });

})
