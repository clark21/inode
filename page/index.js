module.exports =  {

    render : function()
    {
        this.assign('title', 'This is Index Page')
            .assign('desc', 'Lorem ipsum dolor. Whatever yaya!')
            .display('/index.html');
    }
}

