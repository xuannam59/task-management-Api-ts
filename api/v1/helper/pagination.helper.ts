interface objectPagination {
  currentPage: number,
  limitItem: number,
  skip?: number,
  totalPage?: number
}

const paginationHelper = (objectPagination: objectPagination, query: Record<string, any>, countRecord: number): objectPagination => {
  if (query.page) {
    objectPagination.currentPage = query.page;
  }

  if (query.limit) {
    objectPagination.limitItem = query.limit;
  }
  objectPagination.totalPage = Math.ceil(countRecord / objectPagination.limitItem);
  objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem;

  return objectPagination;
}

export default paginationHelper;