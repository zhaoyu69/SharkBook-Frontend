import history from 'utils/history';

function goto(url){
    window.location.hash=url;
}

function goBack(){
    history.goBack();
}

export {
    goto,
    goBack
}