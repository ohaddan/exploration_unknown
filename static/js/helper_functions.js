// **********************************************
// DOM manipulation
// **********************************************
function show_element_by_id(id){
    document.getElementById(id).style.display = "block";
}
function hide_element_by_id(id){
    document.getElementById(id).style.display = "none";
}

    // **********************************************
    // Enable/disable elements
    // **********************************************

function set_disable_button_with_id(id, is_disabled=true){
    document.getElementById(id).disabled = is_disabled;
}

const buttons_for_disable_between_trials_id = ['choice_button'];
function disable_all_choices_for_inter_trial_interval(){
    buttons_for_disable_between_trials_id.
        forEach(button_id => set_disable_button_with_id(button_id));
}

function disable_all_choices_after_inter_trial_interval(iti=INTER_TRIAL_INTERVAL){
    setTimeout(()=>{
        buttons_for_disable_between_trials_id.
            forEach(button_id => set_disable_button_with_id(button_id, false))
    }, iti);
}

    // **********************************************
    // Show reward information to user
    // **********************************************
const USER_MESSAGE_REWARD_ID = "user_message_reward";
function display_reward_message(r){
    document.getElementById('user_message_reward_amount').innerText = r;
    show_element_by_id(USER_MESSAGE_REWARD_ID);
}

function hide_reward_message_after_inter_tria_interval(){
    setTimeout(()=>hide_element_by_id(USER_MESSAGE_REWARD_ID), INTER_TRIAL_INTERVAL);
}

function get_room_dom_element(r, c){
    return document.getElementById('map_table_r' + r + 'c' + c);
}
function reveal_room(r, c){
    rooms_list[r][c].reveal();
    let room = get_room_dom_element(r, c);
    room.classList.remove(HIDDEN_MAP_ROOM);
    room.classList.add(REVEALED_MAP_ROOM);
}

const USER_MESSAGE_ALL_REWARDS_ID = 'user_message_past_rewards';
const USER_MESSAGE_ALL_REWARDS_AMOUNT_ID = 'user_message_past_rewards_amount';
function display_some_room_rewards(r, c){
    if (this_is_not_current_room(r, c)) {
        if (rooms_list[r][c].is_revealed) {
            let room_rewards = rooms_list[r][c].rewards;
            let user_message_all_rewards_dom = document.getElementById(USER_MESSAGE_ALL_REWARDS_AMOUNT_ID);
            user_message_all_rewards_dom.innerText = room_rewards;
            document.getElementById(USER_MESSAGE_ALL_REWARDS_ID).classList.add('user_message_past_rewards_other_rooms');
        }
    }
    else{
        display_current_room_rewards();
    }
}
function display_current_room_rewards(){
    let user_message_all_rewards_dom = document.getElementById(USER_MESSAGE_ALL_REWARDS_AMOUNT_ID);
    user_message_all_rewards_dom.innerText = current_room.rewards;
    document.getElementById(USER_MESSAGE_ALL_REWARDS_ID).classList.remove('user_message_past_rewards_other_rooms');
}
// **********************************************
// Timing functions
// **********************************************

function set_trial_start_time_now(){
    trial_start_time = Date.now();
}

function set_trial_start_time_after_inter_trial_interval(iti=INTER_TRIAL_INTERVAL){
    setTimeout(set_trial_start_time_now, iti);
}

// **********************************************
// Mathematical functions
// **********************************************

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

// **********************************************
// 2D array functions
// **********************************************
function get_shuffled_list_of_pairs(N_COL, N_ROW){
    let index_pairs_list = [];
    for (let i = 0; i < N_COL; i++) {
        for (let j = 0; j < N_ROW; j++) {
            index_pairs_list.push([i, j]);
        }
    }
    return shuffle(index_pairs_list);
}

function get_dictionary_of_rooms(){
    let room_dictionary = {};
    for (let i = 0; i < N_COL; i++) {
        room_dictionary[i] = {}
        for (let j = 0; j < N_ROW; j++) {
            room_dictionary[i][j] = new Room(i, j);
        }
    }
    return room_dictionary;
}

// **********************************************
// Room management
// **********************************************
function get_new_reward_distribution(){
    switch(REWARD_DISTRIBUTION) {
        case 'exp_rewards_same':
            new Distribution(10, 2);
        case 'decreasing':
    }
}
function get_out_of_current_room(){
    if (current_room) {
        let previous_room_dom = get_room_dom_element(current_room.r, current_room.c);
        previous_room_dom.classList.remove(CURRENT_ROOM_CLASS);
    }
}

function go_to_new_room(){
    get_out_of_current_room();
    let [row, column] = ROOM_ORDER[room_reveal_index];
    // Set display
    let room_dom_element = get_room_dom_element(row, column);
    room_dom_element.classList.add(CURRENT_ROOM_CLASS);
    room_dom_element.innerText = room_symbols[room_reveal_index];
    reveal_room(row, column);
    // Set room properties
    let new_room = rooms_list[row][column];
    new_room.set_reward_distribution(get_new_reward_distribution());
    current_room = new_room;
    display_current_room_rewards();
    room_reveal_index+=1;
}

function this_is_not_current_room(r, c){
    return (current_room.r!=r & current_room.c!=c)
}
const CURRENT_ROOM_CLASS = 'current_room';
function move_to_room(r, c){
    if (this_is_not_current_room(r, c) & rooms_list[r][c].is_revealed){
        get_out_of_current_room();
        // Make next room current
        current_room = rooms_list[r][c];
        let current_room_dom = get_room_dom_element(r, c);
        current_room_dom.classList.add(CURRENT_ROOM_CLASS);
    }
}
// **********************************************
// Manage interaction with backend
// **********************************************

function log_choice(){
 //TODO
}