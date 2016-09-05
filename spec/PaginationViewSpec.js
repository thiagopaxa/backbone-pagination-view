describe('PaginationView', function() {
  'use strict';

  it('should have same attributes defined in instantiation', function() {
    var pagination = new PaginationView(
      {currentPage: 5, totalPages: 10, template: '#template-page' }
    );

    expect([pagination.currentPage, pagination.totalPages]).toEqual([5, 10]);
  });

});