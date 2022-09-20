describe('Home Page', () => {

    beforeEach(()=> {
        /* Deprecated
        cy.fixture('courses.json').as("coursesJSON");
        cy.server();
        cy.route('/api/courses',"@coursesJSON").as("courses");*/
        cy.intercept('GET', '/api/courses', {
            fixture: 'courses'
        });
        cy.visit('/');
    })

    it('should display a list of courses', () => {
        cy.contains("All Courses");
        /* don't need due to deprecated cy server()/route()
        cy.wait('@courses');*/
        cy.get('mat-card').should("have.length", 9);
    });

    it('should display the advanced courses', () => {
        cy.get('.mat-tab-label').should("have.length", 2);
        cy.get('.mat-tab-label').last().click();
        cy.get('.mat-tab-body-active .mat-card-title').its('length').should('be.gt',1);
        cy.get('.mat-tab-body-active .mat-card-title').first().should('contain', "Angular Security Course");
    });
});
