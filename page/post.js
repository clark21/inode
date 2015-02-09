module.exports =  {

    render : function()
    {
        this.assign('title', 'This is Post Page')
            .assign('desc', 'Lorem ipsum dolor. Whatever yaya!')
            .display(__dirname+'/../tpl/index.html');
    }
}

