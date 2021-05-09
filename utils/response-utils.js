exports.createDto = (v) => {
  return {
    ...v.toObject(),
    createdAt: v.createdAt.toISOString(),
    updatedAt: v.updatedAt.toISOString(),
  };
};
