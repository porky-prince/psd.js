// Generated by CoffeeScript 1.12.7
module.exports = {
  parsePositionAndChannels: function() {
    var i, id, j, length, ref, results;
    this.top = this.file.readInt();
    this.left = this.file.readInt();
    this.bottom = this.file.readInt();
    this.right = this.file.readInt();
    this.channels = this.file.readShort();
    this.rows = this.height = this.bottom - this.top;
    this.cols = this.width = this.right - this.left;
    results = [];
    for (i = j = 0, ref = this.channels; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      id = this.file.readShort();
      length = this.file.readInt();
      results.push(this.channelsInfo.push({
        id: id,
        length: length
      }));
    }
    return results;
  }
};