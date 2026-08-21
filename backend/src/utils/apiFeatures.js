class ApiFeatures {

    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    search(searchFields = []) {
        const search = this.queryString.search;

        if (search && searchFields.length) {
            this.query = this.query.find({
                $or: searchFields.map((field) => ({
                    [field]: {
                        $regex: search,
                        $options: "i",
                    },
                })),
            });
        }

        return this;
    }

    filter() {
        const queryObject = { ... this.queryString };

        const excludedFields = ["search", "page", "limit", "sort"];

        excludedFields.forEach((field) => {
            delete queryObject[field];
        });

        this.query = this.query.find(queryObject);

        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.replaceAll(",", " ");

            this.query = this.query.sort(sortBy);

        } else {
            this.query = this.query.sort("-createdAt");
        }

        return this;
    }

    paginate() {
        const page = Number(this.queryString.page) || 1;

        const limit = Number(this.queryString.limit) || 100;

        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }

}

export default ApiFeatures;