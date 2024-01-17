const bcrypt = require("bcrypt");
const prisma = require("../prisma/client");

async function hashPassword(password) {
  if (!password) throw new Error("password is not defined");
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

// for search info check the link below
// https://www.prisma.io/docs/orm/prisma-client/queries/full-text-search
async function getPaginatedResults({
  model,
  perPage = 10,
  page = 1,
  sort = "id_1",
  searchColumns = null,
  searchText = null,
  where = {},
  ...rest
}) {
  perPage = Number(perPage);
  page = Number(page);
  sort = sort.split("_");
  let sortBy = sort[0];
  let sortOrder = Number(sort[1]) ? "asc" : "desc";
  let totalCount;
  let results;

  try {
    if (searchColumns && searchText) {
      // Fetch total count without pagination
      totalCount = await prisma[model].count({
        where: {
          ...where,
          OR: searchColumns.map((column) => ({
            [column]: {
              contains: searchText,
            },
          })),
        },
      });
      // Fetch paginated results
      results = await prisma[model].findMany({
        take: perPage,
        skip: (page - 1) * perPage,
        orderBy: {
          [sortBy]: sortOrder,
        },
        where: {
          ...where,
          OR: searchColumns.map((column) => ({
            [column]: {
              contains: searchText,
            },
          })),
        },
        ...rest,
      });
    } else {
      // Fetch total count without pagination
      totalCount = await prisma[model].count({
        where,
      });
      // Fetch paginated results
      results = await prisma[model].findMany({
        take: perPage,
        skip: (page - 1) * perPage,
        orderBy: {
          [sortBy]: sortOrder,
        },
        where,
        ...rest,
      });
    }

    // Calculate pagination information
    const totalPages = Math.ceil(totalCount / perPage);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    // Generate links
    const links = {
      first: 1,
      last: totalPages,
      prev: hasPrevPage ? page - 1 : null,
      next: hasNextPage ? page + 1 : null,
    };

    // Prepare the response
    return {
      data: results,
      links: links,
      meta: {
        currentPage: page,
        total: totalCount,
      },
    };
  } catch (error) {
    console.error("Error fetching paginated results:", error);
    throw error;
  }
}

module.exports = {
  hashPassword,
  getPaginatedResults,
};
