// eslint-disable-next-line no-extend-native
Date.prototype.getBeginOfMonth = function () {
    return new Date(this.getFullYear(), this.getMonth(), 1, 0, 0, 0, 0);
};

// eslint-disable-next-line no-extend-native
Date.prototype.toLocaleISOString = function () { // uses here instead of Date.prototype.toISOString()
    return this.getFullYear() + "-"
        + (this.getMonth() + 1 < 10 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1)) + "-"
        + (this.getDate() < 10 ? "0" + this.getDate() : this.getDate());
};

// eslint-disable-next-line no-extend-native
Date.prototype.daysInMonth = function () {
    return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
};
