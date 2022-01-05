// ************************************************************************************************
// Constants
// ************************************************************************************************
const N_COL = 10;
const N_ROW = 10;
// const INTER_TRIAL_INTERVAL = 1500;  //ms
const INTER_TRIAL_INTERVAL = 600;  //ms
const ROOM_ORDER = get_shuffled_list_of_pairs(N_COL, N_ROW);

// ************************************************************************************************
// Global variables
// ************************************************************************************************
let trial_start_time = Date.now();
let rooms_list = get_dictionary_of_rooms(N_COL, N_ROW);
let room_reveal_index = 0; // How many times ha "explore the unknown" was chosen
let current_room;

// ************************************************************************************************
// Trial management
// ************************************************************************************************

function do_on_load(){
    create_map_table();
    go_to_new_room(room_reveal_index);
    screen_resize();
}

function choice_button_pressed(){
    disable_all_choices_for_inter_trial_interval();
    disable_all_choices_after_inter_trial_interval();
    set_trial_start_time_after_inter_trial_interval();
    let current_reward = current_room.get_reward();
    log_choice(current_reward, action='');
    display_reward_message(current_reward);
    display_current_room_rewards();
    hide_reward_message_after_inter_tria_interval();
}

function go_to_next_block(){
    window.location.href = 'next_page';
}
