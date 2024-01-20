export function isContains(where: any[], what: any[]) {
  for (let i = 0; i < what.length; i++) {
    if (where.indexOf(what[i]) == -1) return false;
  }
  return true;
}

export function isIntersection(where: any[], what: any[]) {
  for (let i = 0; i < what.length; i++) {
    if (where.indexOf(what[i]) !== -1) return true;
  }
  return false;
}

export function removeDuplicatesById(arr: { id: number }[]) {
  const withoutDublicates = [];
  arr.forEach((q) => {
    const findedId = withoutDublicates.find((e) => e.id === q.id);
    if (!findedId) {
      withoutDublicates.push(q);
    }
  });
  return withoutDublicates;
}
