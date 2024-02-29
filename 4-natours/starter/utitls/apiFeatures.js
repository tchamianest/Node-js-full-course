class APIFeature {
  constructor(query, querystring) {
    this.query = query;
    this.querystring = querystring;
  }

  filter() {
    const queryObj = { ...this.querystring };
    const dontPassFilterArray = ["page", "sort", "fields"];
    dontPassFilterArray.forEach((el) => delete queryObj[el]);

    let querStr = JSON.stringify(queryObj);

    querStr = querStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let finalFilter = JSON.parse(querStr);

    this.query = this.query.find(finalFilter);
    return this;
  }

  sort() {
    if (this.querystring.sort) {
      //second option
      const sortBy = this.querystring.sort.split(",").join(" ");
      // query = query.sort(req.query.sort);

      // ADVANCED SORTING
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-startDate");
    }
    return this;
  }
  limitField() {
    if (this.querystring.fields) {
      const fieldsdisplay = this.querystring.fields.split(",").join(" ");
      this.query = this.query.select(fieldsdisplay);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  pagination() {
    const page = this.querystring.page * 1 || 1;
    const limits = this.querystring.limit * 1 || 100;
    const skip = (page - 1) * limits;
    this.query = this.query.skip(skip).limit(limits);

    return this;
  }
}
module.exports = APIFeature;
