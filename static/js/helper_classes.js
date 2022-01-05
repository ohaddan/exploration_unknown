//************************************
// Room
//************************************
class Room{
    constructor(row, col) {
        this.r = row;
        this.c = col;
        this.rewards = [];
        this.is_revealed = false;
    }
    set_reward_distribution(d){
        this.reward_distribution = d;
    }

    get_reward(){
        let reward = this.reward_distribution.draw_value();
        this.rewards.push(reward);
        return reward;
    }

    reveal(){
        this.is_revealed = true;
    }
}


//************************************
// Distribution
//************************************
function rand_normal(mu, sigma) {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return mu+sigma*(Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v ));
}

class Distribution{
    constructor(mean, std, is_integer=true) {
        this.mean = mean;
        this.std = std;
        this.is_integer = is_integer;
    }

    draw_value(){
        let value_from_dist = rand_normal(this.mean, this. std);
        if (this.is_integer){
            value_from_dist = Math.round(value_from_dist);
        }
        return value_from_dist;
    }
}