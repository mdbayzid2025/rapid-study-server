class QueryBuilder {
  constructor(modelQuery, query) {    
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // Searching
  search(searchableFields) {
    if (this?.query?.searchTerms) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(field => ({
          [field]: {
            $regex: this.query.searchTerms,
            $options: 'i',
          },
        })),
      });
    }
    return this;
  }

  // Filtering
  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ['searchTerms', 'sort', 'page', 'limit', 'fields'];
    excludeFields.forEach(el => delete queryObj[el]);

    Object.keys(queryObj).forEach(key => {
      const value = queryObj[key];
      if (value === '' || value == null) {
        delete queryObj[key];
      }
    });

    this.modelQuery = this.modelQuery.find(queryObj);
    return this;
  }

  // Sorting
  sort() {
    let sort = this?.query?.sort || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort);

    return this;
  }

  // Pagination
  paginate() {
    let limit = Number(this?.query?.limit) || 10;
    let page = Number(this?.query?.page) || 1;
    let skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  // Fields filtering
  fields() {
    let fields = (this?.query?.fields || '').split(',').join(' ') || '-__v';
    this.modelQuery = this.modelQuery.select(fields);

    return this;
  }

  // Populating
  populate(populateFields, selectFields) {
    this.modelQuery = this.modelQuery.populate(
      populateFields.map(field => ({
        path: field,
        select: selectFields[field],
      }))
    );
    return this;
  }

  // Pagination Information
  async getPaginationInfo() {
    const total = await this.modelQuery.model.countDocuments(
      this.modelQuery.getFilter()
    );
    const limit = Number(this?.query?.limit) || 10;
    const page = Number(this?.query?.page) || 1;
    const totalPage = Math.ceil(total / limit);

    return {
      total,
      limit,
      page,
      totalPage,
    };
  }
}

module.exports = QueryBuilder;
