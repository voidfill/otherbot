let e = {}
module.exports = {
    init(that){
        e = that.settings
    },

    getKeys(){
        return e.getKeys()
    },

    get(a, b = "no setting"){
        return e.get(a, b)
    },

    set(a, b){
        return e.set(a, b)
    },
    delete(a){
        e.delete(a)
    }

}