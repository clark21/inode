module.exports =  {

    render : function()
    {
        this.assign('title', 'This is Post Detail Page')
            .assign('desc', 'Lorem ipsum dolor. Whatever yaya!')
            .display('/index.html');
    }
}

