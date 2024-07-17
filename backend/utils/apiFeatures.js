class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    //1A) filtering
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    //1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // { category: 'Electronics', price {$gte: 200}} we want this
    // { category: 'Electronics', price: { gte: '100' } }
    //gte, gt, lte,lt
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  sort() {
    //2) Sorting
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else this.query = this.query.sort('addedAt');
    return this;
  }
  limitFields() {
    //3) Field limiting
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v'); //- excluding field __v to see in results of request
    }
    return this;
  }
  paginate() {
    //4) Pagination
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    // page=2&limit=5 1-5 page 1, 6-10 page 2
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
