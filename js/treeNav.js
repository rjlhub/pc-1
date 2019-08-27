$.fn.extend({
    treeview:    function() {
        return this.each(function() {
            var tree = $(this);
            tree.addClass('treeview-tree');
            tree.find('li').each(function() {
                var stick = $(this);
            });
            tree.find('li').has("ul").each(function () {
                var branch = $(this); //li with children ul
                branch.prepend("<i class='tree-indicator '>></i>");
                branch.addClass('tree-branch');
                branch.on('click', function (e) {
                    if (this == e.target) {
                        var icon = $(this).children('i:first');
                        $(this).children().children().toggle();
                    }
                })
                branch.children().children().toggle();
                branch.children('.tree-indicator, button, a').click(function(e) {
                    branch.click();
                    e.preventDefault();
                });
            });
        });
    }
});
//调用
$(window).on('load', function () {
    $('.treeview').each(function () {
        var tree = $(this);
        tree.treeview();
    })
})