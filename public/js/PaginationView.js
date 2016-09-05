(function(root) {
  'use strict';

  root.PaginationView = Backbone.View.extend({
    initialize: function (opts) {
      _.extend(this, opts);
      this.setTemplate(opts.template);
      this.setPrintWhiteList();
      this.setPages();
    },

    setTemplate: function (templateEl) {
      this.template = _.template($(templateEl).html());
    },

    setPages: function () {
      this.templatePages = {
        before: this.isNotFirst(this.currentPage),
        after : this.isNotLast(this.currentPage),
        pages : this.mountPagesArr()
      };
    },

    mountPagesArr: function () {
      var pages = [];

      for (var i = 1; i <= this.totalPages; i++) {

        if (this.cantBePrinted(i) && this.ellipsisId === i) {
          pages.push(this.mountPageObj(i, '...'));
          continue;

        } else if (this.cantBePrinted(i)) {
          continue;

        }

        this.ellipsisId = null;
        pages.push(this.mountPageObj(i));
      }

      return pages;
    },

    mountPageObj: function (index, ellipsis) {
      return {
        index   : index,
        current : this.currentPage === index,
        text    : ellipsis || index,
        ellipsis: ellipsis || false
      };
    },

    isNotFirst: function (index) {
      if (index <= 1) {
        return false;
      }

      return true;
    },

    isNotLast: function (index) {
      if (index === this.totalPages) {
        return false;
      }

      return true;
    },

    cantBePrinted: function (pageIndex) {
      if (this.printWhiteList.indexOf(pageIndex) >= 0 ) {
        return false;
      }

      this.ellipsisId = this.ellipsisId || pageIndex
      return true;
    },

    setPrintWhiteList: function() {
      var currentRange = _.range(this.currentPage - 2, this.currentPage + 3);

      var whiteList = [1, 2, this.totalPages, this.totalPages - 1];
      this.printWhiteList = _.uniq(whiteList.concat(currentRange));
    },

    render: function() {
      var template = this.template(this.templatePages);
      $(this.renderAt).html(template);
    }
  });

})( window );