export function mediamatch(){
    if(window.matchMedia('(max-width: 600px)').matches){
        return 'sm';
    }else if(window.matchMedia('(max-width: 960px)').matches){
        return 'md';
    }else if(window.matchMedia('(max-width: 1280px)').matches){
        return 'md';
    }else if(window.matchMedia('(max-width: 1920px)').matches){
        return 'xd'
    }
    return 
}