const MINIMAL_WIDTH = 1070; // This should be the real content
// const MINIMAL_WIDTH = 600;
const MINIMAL_HEIGHT = 620;

const CLASS_SHOW_ELEMENT = "show_element";
const CLASS_HIDE_ELEMENT = "hide_element";
const RESIZE_SCREEN_MESSAGE_ID = "size_screen_message";
const ALL_USER_CONTENT_ID = "all_user_content";

function show_element(id){
    document.getElementById(id).classList.add(CLASS_SHOW_ELEMENT);
    document.getElementById(id).classList.remove(CLASS_HIDE_ELEMENT);
}

function hide_element(id){
    document.getElementById(id).classList.add(CLASS_HIDE_ELEMENT);
    document.getElementById(id).classList.remove(CLASS_SHOW_ELEMENT);
}


function is_screen_too_small(){
    return (window.innerWidth<MINIMAL_WIDTH) || (window.innerHeight<MINIMAL_HEIGHT)
}

function screen_too_small(){
    show_element(RESIZE_SCREEN_MESSAGE_ID);
    hide_element(ALL_USER_CONTENT_ID);
}

function screen_is_in_ok_size(){
    hide_element(RESIZE_SCREEN_MESSAGE_ID);
    show_element(ALL_USER_CONTENT_ID);
}

function screen_resize(){
    if(is_screen_too_small()){
        screen_too_small();
    }
    else{
        screen_is_in_ok_size();
    }
}

window.addEventListener('resize', screen_resize, true);