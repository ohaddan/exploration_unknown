const MAP_TABLE_CLASS_NAME = 'map_table_cell';
const HIDDEN_MAP_ROOM = 'map_hidden_room';
const REVEALED_MAP_ROOM = 'map_revealed_room';
let room_symbols = ['ཀ', 'ཁ', 'ག', 'གྷ', 'ང', 'ཅ', 'ཆ', 'ཇ', 'ཉ', 'ཊ', 'ཋ', 'ཌ', 'ཌྷ', 'ཎ', 'ཏ', 'ཐ', 'ད', 'དྷ', 'ན', 'པ', 'ཕ',
    'བ', 'བྷ', 'མ', 'ཙ', 'ཚ', 'ཛ', 'ཛྷ', 'ཝ', 'ཞ', 'ཟ', 'འ', 'ཡ', 'ར', 'ལ', 'ཤ', 'ཥ', 'ས', 'ཧ', 'ཨ', 'ཀྵ', 'ཪ', 'ཨ', 'ཨཱ', 'ཨི',
    'ཨཱི', 'ཨུ', 'ཨཱུ', 'ཨྲྀ', 'ཨཷ', 'ཨླྀ', 'ཨཹ', 'ཨེ', 'ཨཻ', 'ཨོ', 'ཨཽ', 'ཨཾ', 'ཨཿ', 'ཨྀ', 'ཨཱྀ', 'ཨྂ', 'ཨྃ', 'ཨ྄', 'ཨ྅', 'ཨ྆', 'ཨ྇', 'ཨྈ', 'ཨྉ',
    'ཨྊ', 'ཨྋ', '༠', '༡', '༢', '༣', '༤', '༥', '༦', '༧', '༨', '༩', '༪', '༫', '༬', '༭', '༮', '༯', '༰', '༱', '༲', '༳', 'イ',
    'カ', 'サ', 'タ', 'ナ', 'ハ', 'マ', 'ヤ', 'ラ', 'ワ', 'ウ', 'キ', 'シ', 'チ', 'ニ', 'ヒ', 'ミ', '', 'リ', 'エ', 'ク',
    'ス', 'ツ', 'ヌ', 'フ', 'ム', 'ユ', 'ル', 'オ', 'ケ', 'セ', 'テ', 'ネ', 'ヘ', 'メ', 'レ', 'コ', 'ソ', 'ト', 'ノ',
    'ホ', 'モ', 'ヨ', 'ロ', 'ヲ'];
room_symbols = ['ༀ',  '༁',  '༂',  '༃',  '༄',  '༅',  '༆',  '༇',  '༈',  '༉',  '༊',  '།',  '༎',  '༏',  '༐',  '༑',  '༒',
    '༓',  '༔',  '༕',  '༖',  '༗',  '༠',  '༡',  '༢',  '༣',  '༤',  '༥',  '༦',  '༧',  '༨',  '༩',  '༪',  '༫',  '༬',  '༭',  '༮',
    '༯',  '༰',  '༱',  '༲',  '༳',  '༴',  '༵',  '༶',  '༷',  '༸	༹',  '༺',  '༻',  '༼',  '༽',  'ཀ',  'ཁ',  'ག',  'གྷ',  'ང',
    'ཅ',  'ཆ',  'ཇ',  'ཉ',  'ཊ',  'ཋ',  'ཌ',  'ཌྷ',  'ཎ',  'ཏ',  'ཐ',  'ད',  'དྷ',  'ན',  'པ',  'ཕ',  'བ',  'བྷ',  'མ',  'ཙ',
    'ཚ',  'ཛ',  'ཛྷ',  'ཝ',  'ཞ',  'ཟ',  'འ',  'ཡ',  'ར',  'ལ',  'ཤ',  'ཥ',  'ས',  'ཧ',  'ཨ',  'ཀྵ',  'ཪ',  'ཫ',  'ཬ',
    'ྈ', 'ྉ', 'ྊ', 'ྋ', 'ྌ',  '྾',  '྿',  '࿀',  '࿂',  '࿃',  '࿄',  '࿅',  '࿆',  '࿇',  '࿈',  '࿉',  '࿊',  '࿋',  '࿌',
    '࿎',  '࿏',  '࿐',  '࿑',  '࿒',  '࿓',  '࿔',  '࿙'];

shuffle(room_symbols);

function add_cell_to_map_table_row(tr_parent, r, c, room_symbol=''){
    let new_td = document.createElement("td");
    new_td.id = 'map_table_r' + r + 'c' + c;
    new_td.classList.add(MAP_TABLE_CLASS_NAME);
    new_td.classList.add(HIDDEN_MAP_ROOM);
    new_td.innerText = '_';
    new_td.onclick = ()=> {move_to_room(r, c)};
    new_td.onmouseenter= ()=> {display_some_room_rewards(r,c)};
    new_td.onmouseout= ()=> {display_current_room_rewards()};
    // on hover set text to (r.c) and maybe change color
    tr_parent.appendChild(new_td);
}

function create_map_table(n_col=N_COL, n_row=N_ROW){
    let room_index = 0;
    let map_table = document.getElementById("map_table");
    for (let i = 0; i < n_row; i++) {
        let new_tr_i = document.createElement("tr");
        for (let j = 0; j < n_col; j++) {
            add_cell_to_map_table_row(new_tr_i, i, j, room_symbols[room_index]);
            room_index += 1;
        }
        map_table.appendChild(new_tr_i);
    }
}
